const moment = require("moment-timezone");
const fs = require("fs");
const { getStreamFromURL } = global.utils;

// ================== 🔒 AUTHOR LOCK SYSTEM ==================
const AUTHOR = "FARHAN-KHAN";
const FILE = __filename;

(function lockFile() {
  try {
    const data = fs.readFileSync(FILE, "utf8");

    if (!data.includes(`author: "${AUTHOR}"`)) {
      console.log("❌ AUTHOR CHANGED! FILE LOCKED.");
      module.exports = {
        config: { name: "locked", version: "0.0.0", author: "SYSTEM" },
        onStart: async function () {
          return console.log("🚫 This file is locked بسبب author change!");
        }
      };
      return;
    }

    if (!data.includes("🌺") || !data.includes("😽")) {
      console.log("❌ DESIGN MODIFIED! FILE LOCKED.");
      module.exports = {
        config: { name: "locked", version: "0.0.0", author: "SYSTEM" },
        onStart: async function () {
          return console.log("🚫 File locked بسبب design change!");
        }
      };
      return;
    }

  } catch (e) {
    console.log("Lock Error:", e);
  }
})();
// ===========================================================

module.exports = {
  config: {
    name: "info3",
    version: "2.6.0",
    author: "FARHAN-KHAN",
    role: 0,
    countDown: 20,
    shortDescription: {
      en: "Owner & bot information"
    },
    longDescription: {
      en: "Show detailed information about the bot, owner, uptime and socials"
    },
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {

    // ================= OWNER INFO =================
    const ownerName = "UDAY HASAN SIYAM";
    const ownerAge = "17+";
    const ownerFB = "https://www.facebook.com/share/14k1GZFVH2T/";
    const ownerNumber = "+8801789138157";

    // ================= BOT INFO =================
    const botName = global.GoatBot?.config?.nickNameBot || "NIJHUM";
    const prefix = global.GoatBot?.config?.prefix || ".";
    const totalCommands = global.GoatBot?.commands?.size || 225;

    // ================= MEDIA =================
    const images = [
      "https://files.catbox.moe/8f2fc5.mp4"
    ];
    const image = images[Math.floor(Math.random() * images.length)];

    // ================= TIME =================
    const now = moment().tz("Asia/Dhaka");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    // ================= UPTIME =================
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // ================= OUTPUT =================
    return message.reply({
      body: `⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
‎    ╭•┄┅══❁🌺❁══┅┄•╮
 •—»✨𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢✨«—•
‎    ╰•┄┅══❁🌺❁══┅┄•╯
‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

╔══════════════════════╗
║ 👑 𝗢𝗪𝗡𝗘𝗥 ➤ 𝗨𝗗𝗔𝗬 𝗛𝗔𝗦𝗔𝗡 𝗦𝗜𝗬𝗔𝗠
║ 🤖 𝗕𝗢𝗧 ➤ ${botName}
╠══════════════════════╣
║ 🕌 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡 ➤ 𝗜𝗦𝗟𝗔𝗠
║ 🎂 𝗔𝗚𝗘 ➤ 𝟭𝟳+
║ 🚹 𝗚𝗘𝗡𝗗𝗘𝗥 ➤ 𝗠𝗔𝗟𝗘
╠══════════════════════╣
║ 🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ↓
║ ➤ ${ownerFB}
║
║ 📞 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 ↓
║ ➤ ${ownerNumber}
╠══════════════════════╣
║ ⚡ 𝗣𝗥𝗘𝗙𝗜𝗫 ➤ ${prefix}
║ 📦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ➤ ${totalCommands}
║ 🚀 𝗣𝗜𝗡𝗚 ➤ N/A
╠══════════════════════╣
║ ⏳ 𝗨𝗣𝗧𝗜𝗠𝗘 ➤ ${uptimeString}
║ 🕒 𝗧𝗜𝗠𝗘 ➤ ${time}
║ 📅 𝗗𝗔𝗧𝗘 ➤ ${date}
╠══════════════════════╣
║ 🏠 𝗔𝗗𝗗𝗥𝗘𝗦𝗦
║ ➤ 𝗞𝗜𝗦𝗛𝗢𝗥𝗘𝗚𝗔𝗡𝗝
║ ➤ 𝗕𝗔𝗡𝗚𝗟𝗔𝗗𝗘𝗦𝗛
║
║ 💔 𝗦𝗧𝗔𝗧𝗨𝗦 ➤ 𝗦𝗜𝗡𝗚𝗟𝗘
║ 🧑‍🎓 𝗪𝗢𝗥𝗞 ➤ 𝗦𝗧𝗨𝗗𝗘𝗡𝗧
╠══════════════════════╣

⊱༅༎😽💚༅༎⊱
➤ আমি নিজের মতোই চলি 😎  
➤ আমি কপি না, আমি আলাদা 🔥  
➤ যারে ভালোবাসি, শেষ পর্যন্ত 🖤  
⊱༅༎😽💚༅༎⊱

╠══════════════════════╣
♡ 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 ♡
      ♡ 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ♡
╚══════════════════════╝`,
      attachment: await getStreamFromURL(image)
    });
  }
};

