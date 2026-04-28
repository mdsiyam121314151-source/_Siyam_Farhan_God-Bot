const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "fork2",
    aliases: ["repo", "link"],
    version: "3.0",
    author: "SIYAM-HASAN",
    countDown: 0,
    role: 0,
    category: "system",
    guide: { en: "{pn}" }
  },

  // ✅ No Prefix Support
  onChat: async function ({ event, message }) {
    const body = event.body ? event.body.toLowerCase() : "";
    if (body === "fork" || body === "repo" || body === "link") {
      return this.run(message);
    }
  },

  onStart: async function ({ message }) {
    return this.run(message);
  },

  run: async function (message) {

    const time = moment.tz("Asia/Dhaka").format("hh:mm A");
    const date = moment.tz("Asia/Dhaka").format("DD MMMM YYYY");

    let prefix = global.GoatBot?.config?.prefix || "/";
    let totalCommands = global.GoatBot?.commands?.size || "Unknown";

    const msg = `
╔═══════『 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 』═══════╗

🔗 REPOSITORY
https://github.com/FARHAN-MIRAI-BOT/GOAT

╭───────────────╮
│ 🕒 TIME : ${time}
│ 📅 DATE : ${date}
│ ⚙️ COMMANDS : ${totalCommands}
│ 🔰 PREFIX : ${prefix}
╰───────────────╯

╔═══════『 👑 𝆠፝𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 』═══════╗

👤 𝆠፝𝐍𝐀𝐌𝐄 : 𝐔𝐃𝐀𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌
📍 𝆠፝𝐀𝐃𝐃𝐑𝐄𝐒𝐒 : 𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉, 𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
🎂 𝆠፝𝐀𝐆𝐄 : 𝟏𝟕+
📚 𝆠፝𝐄𝐃𝐔𝐂𝐀𝐓𝐈𝐎𝐍 : 𝐂𝐋𝐀𝐒𝐒 𝟏𝟎
🏫 𝆠፝𝐒𝐂𝐇𝐎𝐎𝐋 : 𝐘𝐄𝐌 𝐀 𝐌𝐀𝐍𝐍𝐀𝐍 𝐌𝐀𝐍𝐈𝐊 𝐇𝐈𝐆𝐇 𝐒𝐂𝐇𝐎𝐎𝐋
💙 𝆠፝𝐒𝐓𝐀𝐓𝐔𝐒 : 𝐒𝐈𝐍𝐆𝐋𝐄

🔗 𝆠፝𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 : https://facebook.com/61560326905548
📞 𝆠፝𝐏𝐇𝐎𝐍𝐄 : +8801789138157

╚═══════════════════════════════╝
`;

    return message.reply(msg);
  }
};
