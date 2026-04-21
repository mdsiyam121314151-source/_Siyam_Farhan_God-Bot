module.exports = {
  config: {
    name: "join",
    version: "1.1.0",
    author: "FARHAN-KHAN",
    countDown: 5,
    role: 2, 
    description: "Get all group list and join by serial number",
    category: "System",
    guide: {
        en: "{pn}"
    }
  },

/* --- [ 🔐 FILE_CREATOR_INFORMATION ] ---
 * 🤖 BOT NAME: FARHAN BOT
 * 👤 OWNER: FARHAN KHAN 
 * 📍 LOCATION: CHUAGANGA, BANGLADESH
 * --------------------------------------- */

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    try {
      // ১০টি থ্রেড লিস্ট নেওয়ার চেষ্টা
      const allThreads = await api.getThreadList(20, null, ["INBOX"]) || [];
      const groupList = allThreads.filter(t => t.isGroup && t.isSubscribed);

      if (!groupList || groupList.length === 0) {
        return api.sendMessage("❌ মামা, বটের কাছে কোনো সচল গ্রুপের তথ্য পাওয়া যায়নি।", threadID, messageID);
      }

      let msg = "📜 𝐆𝐫𝐨𝐮𝐩 𝐋𝐢𝐬𝐭 📜\n━━━━━━━━━━━━━━━━━\n";
      groupList.forEach((group, index) => {
        msg += `${index + 1}. ${group.name || "Unknown Group"}\n`;
      });
      msg += "\n━━━━━━━━━━━━━━━━━\n👉 যে গ্রুপে জয়েন হতে চান, সেই সিরিয়াল নাম্বারটি লিখে রিপ্লাই দিন।";

      return api.sendMessage(msg, threadID, (err, info) => {
        if (err) return console.log(err);
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          groupList
        });
      }, messageID);

    } catch (e) {
      return api.sendMessage(`❌ এরর: গ্রুপের লিস্ট পাওয়া যাচ্ছে না। কিছুক্ষণ পর ট্রাই করো।`, threadID, messageID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    const { threadID, messageID, body, senderID } = event;
    const { author, groupList } = Reply;

    if (author !== senderID) return;

    const index = parseInt(body) - 1;
    if (isNaN(body) || index < 0 || !groupList[index]) {
      return api.sendMessage("❌ মামা, ভুল সিরিয়াল নাম্বার দিয়েছেন। সঠিক নাম্বার লিখে রিপ্লাই দিন।", threadID, messageID);
    }

    const targetGroup = groupList[index];
    const targetThreadID = targetGroup.threadID;

    try {
      await api.addUserToGroup(senderID, targetThreadID);
      api.sendMessage(`✅ সাকসেস! আপনাকে "${targetGroup.name || "ঐ গ্রুপে"}" অ্যাড করা হয়েছে।`, threadID, messageID);
      
      // ওই গ্রুপেও একটা নোটিফিকেশন
      api.sendMessage(`🔔 সিয়াম বস (Owner) এই গ্রুপে জয়েন করেছেন।`, targetThreadID);

    } catch (err) {
      api.sendMessage(`❌ মামা অ্যাড করা যাচ্ছে না। হয়তো আপনি অলরেডি গ্রুপে আছেন বা বট এডমিন না।\nGroup ID: ${targetThreadID}`, threadID, messageID);
    }

    global.GoatBot.onReply.delete(Reply.messageID);
  }
};
