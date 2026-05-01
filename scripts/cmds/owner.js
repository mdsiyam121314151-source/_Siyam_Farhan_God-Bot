const moment = require("moment-timezone");
const fs = require("fs");
const { getStreamFromURL } = global.utils;

// ================== 🔒 STRONG AUTHOR LOCK ==================
const AUTHOR = "FARHAN-KHAN";
const FILE = __filename;

(function lockFile() {
  try {
    const data = fs.readFileSync(FILE, "utf8");

    // ❌ যদি author change হয় → stop bot
    if (!data.includes(`author: "${AUTHOR}"`)) {
      console.log("🚫 AUTHOR TAMPER DETECTED!");
      process.exit(1);
    }

    // ❌ যদি design remove করা হয়
    if (!data.includes("𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢") || !data.includes("😽")) {
      console.log("🚫 FILE MODIFIED!");
      process.exit(1);
    }

  } catch (e) {
    console.log("Lock Error:", e);
  }
})();
// ===========================================================

// ✅ SAFE STREAM
async function safeStream(url) {
  try {
    return await getStreamFromURL(url);
  } catch (e) {
    console.log("Stream failed:", e.message);
    return null;
  }
}

module.exports = {
  config: {
    name: "owner",
    version: "4.0.0",
    author: "FARHAN-KHAN",
    role: 2, // 🔒 owner only
    countDown: 10,
    shortDescription: { en: "Owner info" },
    category: "owner"
  },

  onStart: async function ({ message }) {

    const ownerFB1 = "https://www.facebook.com/share/14k1GZFVH2T/";
    const ownerFB2 = "https://www.facebook.com/share/14k1GZFVH2T/"; // চাইলে আলাদা দিতে পারো

    const video = "https://files.catbox.moe/g5vr8h.mp4";
    const attachment = await safeStream(video);

    const time = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
    const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

    const msg = {
      body: `╔═══❖𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢❖═══╗
 
⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆ 
[🤖]↓:𝐁𝐎𝐓→𝐀𝐃𝐌𝐈𝐍:↓
➤ 『 𝐔𝐃𝐀𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌 』
⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

╠══❖『𝐁𝐈𝐎 𝐀𝐃𝐌𝐈𝐍』❖══╣
⊱༅༎😽💚༅༎⊱

-আমি নিজের মতোই চলি 😎🔥  
-আমি কপি না, আমি আলাদা 🖤  
-যারে ভালোবাসি, শেষ পর্যন্ত 💯  

⊱༅༎😽💚༅༎⊱
╠═════════════════╣

[🏠]↓:𝐀𝐃𝐃𝐑𝐄𝐒𝐒:↓
➤ 『 𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉 』

[🕋]↓:𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍:↓
➤ 『 𝐈𝐒𝐋𝐀𝐌 』

[🚻]↓:𝐆𝐄𝐍𝐃𝐄𝐑:↓
➤ 『 𝐌𝐀𝐋𝐄 』

[💞]↓:𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏:↓
➤ 『 𝐒𝐈𝐍𝐆𝐋𝐄 』

[🧑‍🎓]↓:𝐖𝐎𝐑𝐊:↓
➤ 『 𝐒𝐓𝐔𝐃𝐄𝐍𝐓 』

📅 Date: ${date}
⏰ Time: ${time}

⋆✦⋆═══🅲🅾🅽🆃🅰🅲🆃═══⋆✦⋆

[📞] 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣
➤ https://wa.me/+8801789138157

[🌍] 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 (❶)
➤ ${ownerFB1}

[🌍] 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 (❷)
➤ ${ownerFB2}

╚═══❖𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨❖═══╝`
    };

    if (attachment) {
      msg.attachment = attachment;
    }

    return message.reply(msg);
  }
};
