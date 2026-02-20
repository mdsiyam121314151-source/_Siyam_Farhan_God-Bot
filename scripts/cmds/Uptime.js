const os = require('os');
const moment = require('moment-timezone');
const axios = require('axios');
const mongoose = require('mongoose');

module.exports = {
  config: {
    name: "uptime",
    version: "8.0.0",
    role: 0,
    author: "xalman",
    description: "Premium Uptime for Goat Bot V2",
    category: "system",
    guide: "{pn}",
    countDown: 5
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID, timestamp } = event;

    const sendLoading = await api.sendMessage("⏳ 𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗦𝘆𝘀𝘁𝗲𝗺: 𝟬%", threadID);

    const loadingSteps = ["𝟮𝟬%", "𝟰𝟬%", "𝟲𝟬%", "𝟴𝟬%", "𝟭𝟬𝟬%"];
    
    for (const step of loadingSteps) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Half second delay per step
      await api.editMessage(`⏳ 𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗦𝘆𝘀𝘁𝗲𝗺: ${step}`, sendLoading.messageID);
    }

    const uptime = process.uptime();
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);

    const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
    const dbStatus = mongoose.connection.readyState === 1 ? "Connected 🟢" : "Disconnected 🔴";
    
    const timeNow = moment.tz("Asia/Dhaka").format("hh:mm:ss A");
    const dateNow = moment.tz("Asia/Dhaka").format("DD/MM/YYYY");

    const gifLinks = [
      "https://files.catbox.moe/20q0dn.gif",
      "https://files.catbox.moe/20q0dn.gif"
    ];
    const randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];

    const msg = `
◢◤━━━━━━━━━━━━━━━━◥◣
   𝗚𝗢𝗔𝗧 𝗕𝗢𝗧 𝗩𝟮 𝗢𝗡𝗟𝗜𝗡𝗘
◥◣━━━━━━━━━━━━━━━━◢◤

      『 𝗦𝗬𝗦𝗧𝗘𝗠 𝗔𝗡𝗔𝗟𝗬𝗧𝗜𝗖𝗦 』

💠 𝗨𝗽𝘁𝗶𝗺𝗲 𝗦𝘁𝗮𝘁𝘂𝘀:
  »→ ⏲️ 𝗧𝗶𝗺𝗲: ${days}𝗱 ${hours}𝗵 ${mins}𝗺 ${secs}𝘀
  »→ 🛰️ 𝗟𝗮𝘁𝗲𝗻𝗰𝘆: ${Date.now() - event.timestamp}𝗺𝘀
  »→ 🌐 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗔𝗰𝘁𝗶𝘃𝗲 ✔️

🍃 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲 (𝗠𝗼𝗻𝗴𝗼𝗼𝘀𝗲):
  »~ 🔌 𝗦𝘁𝗮𝘁𝘂𝘀: ${dbStatus}
  » 📁 𝗗𝗕 𝗡𝗮𝗺𝗲: TBTNX210
  » 🧬 𝗗𝗿𝗶𝘃𝗲𝗿: v${mongoose.version}

⚡ 𝗥𝗲𝘀𝗼𝘂𝗿𝗰𝗲𝘀:
  » 💾 𝗥𝗔𝗠: ${usedRam}𝗠𝗕 / ${totalRam}𝗚𝗕
  » 🔋 𝗟𝗼𝗮𝗱: [▓▓▓▓▓▓▓░░░]
  » ⚙️ 𝗡𝗼𝗱𝗲: ${process.version}

🕒 𝗧𝗶𝗺𝗲𝗹𝗶𝗻𝗲:
  » 📅 𝗗𝗮𝘁𝗲: ${dateNow}
  » ⏰ 𝗧𝗶𝗺𝗲: ${timeNow}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   👤 𝗢𝘄𝗻𝗲𝗿: -Rꫝғɪɪ 6x9
   🛡️ 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗦𝗲𝗰𝘂𝗿𝗲𝗱 & 𝗢𝗻𝗹𝗶𝗻𝗲
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`.trim();

    try {
      const stream = (await axios.get(randomGif, { responseType: 'stream' })).data;

      await api.unsendMessage(sendLoading.messageID);
      
      return api.sendMessage({
        body: msg,
        attachment: stream
      }, threadID, messageID);
    } catch (error) {
      return api.editMessage(msg, sendLoading.messageID);
    }
  }
};
