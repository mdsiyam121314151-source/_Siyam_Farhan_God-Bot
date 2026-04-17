const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "siyam admin",
    version: "2.2.0",
    author: "亗 SIYAM HASAN 亗",
    countDown: 5,
    role: 0,
    shortDescription: "Show owner info with video",
    category: "info"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    const msg = event.body ? event.body.toLowerCase() : "";
    if (msg !== "admin" && msg !== "owner") return;

    const time = new Date().toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const date = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const info = `
╭━━━〔《𓆩𝐏𝐑𝐄𝐅𝐈𝐗𓆪》〕━━━╮
┃ 🏷️ 𓆩𝐆𝐑𝐎𝐔𝐏𓆪: 《𓆩╔═══❖•ೋ° 🌟 °ೋ•❖═══╗
👑 SIYAM'S FAMOUS GROUP 👑
╚═══❖•ೋ° 🌟 °ೋ•❖═══╝𓆪》
┃ 🔰 𓆩𝐒𝐘𝐒𝐓𝐄𝐌𓆪: 《/》
┃ 💬 𓆩𝐆𝐑𝐎𝐔𝐏𓆪: 《Messenger》
┃ ⏰ 𓆩𝐓𝐈𝐌𝐄𓆪: 《𓆩${time}𓆪》
┃ 📅 𓆩𝐃𝐀𝐓𝐄𓆪: 𓆩${date}𓆪
┃ 👑 𓆩𝐎𝐖𝐍𝐄𝐑𓆪: 《𓆩𝐔𝐃𝐀𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌𓆪》
┃ ⚡ 𓆩𝐒𝐓𝐀𝐓𝐔𝐒𓆪: 《𓆩𝐎𝐍𝐋𝐈𝐍𝐄𓆪》
╰━━━〔《𓆩𝐒𝐈𝐙𝐔𝐊𝐀𓆪》〕━━━╯

╭━━━〔《𓆩𝐏𝐑𝐎𝐅𝐈𝐋𝐄𓆪》〕━━━╮
┃ 👤 𓆩𝐍𝐀𝐌𝐄𓆪: 《𓆩𝐔𝐃𝐀𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌𓆪》
┃ 🏠 𓆩𝐀𝐃𝐃𝐑𝐄𝐒𝐒𓆪: 《𓆩KISHOREGANJ, BANGLADESH𓆪》
┃ 📚 𓆩𝐂𝐋𝐀𝐒𝐒𓆪: 《𓆩CLASS TEN𓆪》
┃ 🎂 𓆩𝐀𝐆𝐄𓆪: 《𓆩17+𓆪》
┃ 💔 𓆩𝐒𝐓𝐀𝐓𝐔𝐒𓆪: 《𓆩SINGLE𓆪》
┃ 💼 𓆩𝐉𝐎𝐁𓆪: 《𓆩STUDENT𓆪》
╰━━━〔《𓆩𝐈𝐍𝐅𝐎𓆪》〕━━━╯

╭━━━〔《𓆩𝐋𝐈𝐅𝐄𓆪》〕━━━╮
┃ 💋 𓆩𝐇𝐎𝐁𝐁𝐘𓆪: 《𓆩KISSING GIRLS 😏𓆪》
┃ 🎵 𓆩𝐋𝐈𝐊𝐄𓆪: 《𓆩SONG, MOVIE, HANGOUT𓆪》
┃ 🎮 𓆩𝐆𝐀𝐌𝐄𓆪: 《𓆩FREE FIRE 🔥𓆪》
╰━━━〔《𓆩𝐇𝐎𝐁𝐁𝐘𓆪》〕━━━╯

╭━━━〔《𓆩𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄𓆪》〕━━━╮
┃ 😎 I AM NOT LIKE OTHERS
┃ 🔥 I AM DIFFERENT MYSELF
┃ 💔 WHO UNDERSTANDS STAYS
┃ ⚡ WHO DOESN'T CAN LEAVE
╰━━━〔《𓆩𝐊𝐈𝐍𝐆𓆪》〕━━━╯
`;

    // 🎥 Video URL
    const videoUrl = "https://files.catbox.moe/g5vr8h.mp4";
    const filePath = path.join(__dirname, "cache", "admin.mp4");

    try {
      const response = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: info,
            attachment: fs.createReadStream(filePath)
          },
          event.threadID,
          () => fs.unlinkSync(filePath),
          event.messageID
        );
      });

    } catch (e) {
      api.sendMessage(info, event.threadID, event.messageID);
    }
  }
};
