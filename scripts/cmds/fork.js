const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

// 🔒 AUTHOR LOCK
const LOCKED_AUTHOR = "FARHAN-KHAN";

module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "link"],
    version: "1.3",
    author: LOCKED_AUTHOR,
    countDown: 3,
    role: 0,
    longDescription: "Send fork with styled image",
    category: "system",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ message }) {
    try {

      // 🔒 author protection
      if (module.exports.config.author !== LOCKED_AUTHOR) {
        return message.reply("❌ AUTHOR LOCKED! You cannot modify this file.");
      }

      const text =
`⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
‎    ╭•┄┅══❁♻️❁══┅┄•╮
 •—»✨𝗢𝗪𝗡𝗘𝗥 𝗙𝗢𝗥𝗞✨«—•
‎    ╰•┄┅══❁♻️❁══┅┄•╯
‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
‎╔══════════════════╗
‎ 👉-এই নাও বস সিয়াম এর\nғᴀᴄᴇʙᴏᴏᴋ ᴀᴄᴄᴏᴜɴᴛ  লিংক ফলো \nকরে দিও-♻️👇
‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
       ‎[>[https://facebook.com/61560326905548]<]
‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
         ↓𓆩» 𝐆𝐎𝐀𝐓-𝐅𝐎𝐑𝐊 «𓆪↓
‎⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆ https://github.com/mdsiyam01325251695016080-maker/siyam-Hassan-.git
👉:fork2 টাইপ কর 🪬
╠══════════════════╣`;

      const imgUrl = "https://files.catbox.moe/21jqpc.jpg";

      const cacheDir = path.join(__dirname, "cache");
      const filePath = path.join(cacheDir, "fork.jpg");

      // 📁 cache folder ensure
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      // 🌐 download image
      const response = await axios.get(imgUrl, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(response.data));

      // 📤 send message
      await message.reply({
        body: text,
        attachment: fs.createReadStream(filePath)
      });

      // 🧹 cleanup
      fs.unlinkSync(filePath);

    } catch (err) {
      console.error("Fork command error:", err);
      message.reply("❌ Failed to send fork message!");
    }
  }
};
