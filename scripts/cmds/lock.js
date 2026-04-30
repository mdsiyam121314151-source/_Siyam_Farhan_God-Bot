const moment = require("moment-timezone");

const lockedThreads = {};
const pageID = "61560326905548"; // তোমার পেজ আইডি

// 🎨 Premium Message Design
function premium(type, body) {
  const time = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
  const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

  return `
╔══════════════════════════════╗
      👑  𝐒𝐈𝐘𝐀𝐌  𝐇𝐎𝐒𝐒𝐄𝐈𝐍  👑
╚══════════════════════════════╝

        ${type}

━━━━━━━━━━━━━━━━━━━━━━━
${body}
━━━━━━━━━━━━━━━━━━━━━━━

📅 Date : ${date}  
⏰ Time : ${time}  

━━━━━━━━━━━━━━━━━━━━━━━
      💬 𝐍𝐈𝐉𝐇𝐔𝐌 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓 💬
━━━━━━━━━━━━━━━━━━━━━━━
`;
}

module.exports = {
  config: {
    name: "lock",
    version: "5.0",
    author: "SIYAM-PREMIUM",
    countDown: 5,
    role: 1,
    description: "Premium Lock System",
    category: "box chat"
  },

  // 🔐 Command Handler
  onStart: async function ({ api, event, args }) {
    const threadID = event.threadID;
    const senderID = event.senderID;

    const info = await api.getThreadInfo(threadID);
    const adminIDs = info.adminIDs.map(i => i.id);

    // ❌ Not admin
    if (!adminIDs.includes(senderID)) {
      return api.sendMessage(
        premium(
          "🚫✨  ACCESS DENIED  ✨🚫",
          "➤ ❌ শুধুমাত্র এডমিন এই কমান্ড ব্যবহার করতে পারবে\n➤ 🔐 এই ফিচারটি প্রোটেক্টেড"
        ),
        threadID
      );
    }

    const action = args[0]?.toLowerCase();

    // 🔒 LOCK
    if (action === "on" || action === "lock") {
      if (lockedThreads[threadID]) {
        return api.sendMessage(
          premium(
            "⚠️✨  ALREADY LOCKED  ✨⚠️",
            "➤ ✅ গ্রুপ আগেই লক করা আছে\n➤ 🔒 পুনরায় লক করার প্রয়োজন নেই"
          ),
          threadID
        );
      }

      try {
        await api.addUserToGroup(pageID, threadID);
      } catch (e) {}

      lockedThreads[threadID] = true;

      return api.sendMessage(
        premium(
          "🔐✨  GROUP LOCKED  ✨🔐",
          "➤ 🚫 গ্রুপ সফলভাবে লক করা হয়েছে!\n➤ 🔕 এখন কেউ মেসেজ দিতে পারবে না\n➤ ⚠️ শুধুমাত্র এডমিনদের অনুমতি আছে"
        ),
        threadID
      );
    }

    // 🔓 UNLOCK
    if (action === "off" || action === "unlock") {
      if (!lockedThreads[threadID]) {
        return api.sendMessage(
          premium(
            "⚠️✨  ALREADY UNLOCKED  ✨⚠️",
            "➤ ✅ গ্রুপ আগেই আনলক করা আছে\n➤ 🔓 পুনরায় আনলক করার প্রয়োজন নেই"
          ),
          threadID
        );
      }

      delete lockedThreads[threadID];

      try {
        await api.removeUserFromGroup(pageID, threadID);
      } catch (e) {
        console.error(e);
      }

      return api.sendMessage(
        premium(
          "🔓✨  GROUP UNLOCKED  ✨🔓",
          "➤ ✅ গ্রুপ সফলভাবে আনলক করা হয়েছে!\n➤ 🔔 এখন সবাই মেসেজ দিতে পারবে\n➤ 🎉 গ্রুপ আবার অ্যাক্টিভ হয়ে গেছে"
        ),
        threadID
      );
    }

    // ❌ Wrong usage
    return api.sendMessage(
      premium(
        "⚙️✨  COMMAND GUIDE  ✨⚙️",
        "➤ 🔒 /lock on → গ্রুপ লক\n➤ 🔓 /lock off → গ্রুপ আনলক"
      ),
      threadID
    );
  },

  // 🔇 Event Handler (Lock থাকলে auto delete)
  onEvent: async function ({ api, event }) {
    const threadID = event.threadID;
    const senderID = event.senderID;

    if (!lockedThreads[threadID]) return;

    const info = await api.getThreadInfo(threadID);
    const adminIDs = info.adminIDs.map(i => i.id);

    // Admin allowed
    if (adminIDs.includes(senderID)) return;

    try {
      await api.unsendMessage(event.messageID);
    } catch (e) {
      console.error(e);
    }
  }
};
