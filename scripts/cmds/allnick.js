module.exports = {
  config: {
    name: "allnick",
    aliases: ["an"],
    version: "2.1",
    author: "MR_FARHAN",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Change/reset nickname of all members (safe pro)"
    },
    category: "owner",
    guide: {
      en: "{pn} <nickname | cancel>"
    },
    envConfig: {
      delayPerBatch: 800,
      batchSize: 8,
      retryLimit: 2
    }
  },

  onStart: async function ({ api, event, args, message }) {

    const threadID = event.threadID;
    const input = args.join(" ").trim();

    if (!input) {
      return message.reply("⚠️ Enter nickname or 'cancel'");
    }

    try {
      const threadInfo = await api.getThreadInfo(threadID);

      if (!threadInfo.isGroup) {
        return message.reply("❌ Only works in group");
      }

      // 🔥 BOT ID
      const botID = api.getCurrentUserID();

      // 🔥 ADMIN CHECK
      const isAdmin = threadInfo.adminIDs.some(a => a.id == botID);

      if (!isAdmin) {
        return message.reply(
          "⛔ Bot is NOT admin!\n👉 Please make bot admin first to use this command."
        );
      }

      const members = threadInfo.participantIDs;

      const { delayPerBatch, batchSize, retryLimit } = module.exports.config.envConfig;

      const chunkArray = (arr, size) => {
        const res = [];
        for (let i = 0; i < arr.length; i += size) {
          res.push(arr.slice(i, i + size));
        }
        return res;
      };

      await message.reply(`🚀 Processing ${members.length} members...`);

      const batches = chunkArray(members, batchSize);

      let failed = [];
      let done = 0;

      for (const batch of batches) {

        for (const userID of batch) {
          let success = false;

          for (let i = 0; i <= retryLimit; i++) {
            try {
              if (input.toLowerCase() === "cancel") {
                await api.changeNickname("", threadID, userID);
              } else {
                await api.changeNickname(input, threadID, userID);
              }

              success = true;
              break;

            } catch (err) {
              if (i === retryLimit) {
                failed.push(userID);
              }
            }
          }

          done++;
        }

        const percent = Math.floor((done / members.length) * 100);
        await message.reply(`📊 Progress: ${percent}%`);

        await new Promise(res =>
          setTimeout(res, delayPerBatch)
        );
      }

      if (failed.length === 0) {
        if (input.toLowerCase() === "cancel") {
          message.reply("🔄 All nicknames removed successfully");
        } else {
          message.reply("✅ All nicknames updated successfully");
        }
      } else {
        message.reply(`⚠️ Failed: ${failed.length} users`);
      }

    } catch (err) {
      message.reply("❌ Error: " + err.message);
    }
  }
};
