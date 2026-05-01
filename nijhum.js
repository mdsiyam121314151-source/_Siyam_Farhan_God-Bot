const axios = require("axios");

const NIJHUM_API = "https://exxai.onrender.com";

// ─── Typing ─────────────────────────
const typing = async (api, threadID, ms = 1200) => {
  try {
    if (typeof api.sendTypingIndicator === "function") {
      await api.sendTypingIndicator(threadID, true);
      await new Promise(r => setTimeout(r, ms));
      await api.sendTypingIndicator(threadID, false);
    }
  } catch {}
};

// ─── Name ───────────────────────────
const getSenderName = async (usersData, id) => {
  try {
    return (await usersData.getName(id)) || "User";
  } catch {
    return "User";
  }
};

// ─── API ────────────────────────────
const ask = async (msg, name, uid) => {
  const res = await axios.get(`${NIJHUM_API}/api/chat`, {
    params: { message: msg, name, uid },
    timeout: 15000
  });

  if (res.data?.success && res.data?.reply)
    return res.data.reply;

  throw new Error("Nijhum busy 💔");
};

// ───────────────────────────────────
module.exports = {
  config: {
    name: "nijhum",
    version: "4.0",
    author: "SIYAM NO PREFIX",
    role: 0,
    countDown: 0,
    category: "ai"
  },

  // ─── NO PREFIX TRIGGER ────────────
  onChat: async function ({ api, event, message, usersData }) {
    const text = event.body?.trim();
    if (!text) return;

    const lower = text.toLowerCase();

    // trigger words
    const prefixes = ["nijhum ", "nij ", "n "];
    const match = prefixes.find(p => lower.startsWith(p));

    if (!match) return;

    const msg = text.slice(match.length).trim();
    if (!msg) return;

    const senderID = event.senderID;
    const threadID = event.threadID;
    const senderName = await getSenderName(usersData, senderID);

    try {
      await typing(api, threadID);

      const reply = await ask(msg, senderName, senderID);

      return message.reply(
        `🌸 নিঝুম\n━━━━━━━━━━━━━━\n${reply}`,
        (err, info) => {
          if (!err && info?.messageID) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "nijhum",
              author: senderID
            });
          }
        }
      );

    } catch (e) {
      return message.reply("❌ Nijhum এখন ব্যস্ত");
    }
  },

  // ─── REPLY CONTINUE ───────────────
  onReply: async function ({ api, event, message, usersData, Reply }) {

    if (event.senderID !== Reply.author) return;

    const text = event.body?.trim();
    if (!text) return;

    const senderID = event.senderID;
    const threadID = event.threadID;
    const senderName = await getSenderName(usersData, senderID);

    try {
      await typing(api, threadID);

      const reply = await ask(text, senderName, senderID);

      return message.reply(
        `🌸 নিঝুম\n━━━━━━━━━━━━━━\n${reply}`,
        (err, info) => {
          if (!err && info?.messageID) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "nijhum",
              author: senderID
            });
          }
        }
      );

    } catch (e) {
      return message.reply("❌ Nijhum এখন ব্যস্ত");
    }
  }
};
