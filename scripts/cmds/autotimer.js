const moment = require("moment-timezone");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "autotimer",
  version: "5.1",
  role: 0,
  author: "ALVI-BOSS",
  description: "⏰ প্রতি ঘণ্টায় ভিডিওসহ অটো মেসেজ পাঠাবে (Ultra Optimized)",
  category: "AutoTime",
  countDown: 3,
};

module.exports.onLoad = async function ({ api }) {

  const timerData = {
    "12:00 AM": "⌚┆এখন রাত ১২টা বাজে❥︎খাউয়া দাউয়া করে নেউ,🍽️🍛",
    "01:00 AM": "⌚┆এখন রাত ১টা বাজে❥︎সবাই শুয়ে পড়ো,🌌💤",
    "02:00 AM": "⌚┆এখন রাত ২টা বাজে❥︎প্রেম না কইরা যাইয়া ঘুমা বেক্কল,😾🌠",
    "03:00 AM": "⌚┆এখন রাত ৩টা বাজে❥︎যারা ছ্যাকা খাইছে তারা জেগে আছে,🫠🌃",
    "04:00 AM": "⌚┆এখন রাত ৪টা বাজে❥︎ফজরের প্রস্তুতি নাও,🌄",
    "05:00 AM": "⌚┆এখন সকাল ৫টা বাজে❥︎নামাজ পড়ছো তো?🌅☀️",
    "06:00 AM": "⌚┆এখন সকাল ৬টা বাজে❥︎ঘুম থেকে উঠো সবাই,🌞☕",
    "07:00 AM": "⌚┆এখন সকাল ৭টা বাজে❥︎ব্রেকফাস্ট করে নাও,🍞",
    "08:00 AM": "⌚┆এখন সকাল ৮টা বাজে❥︎কাজ শুরু করো মন দিয়ে,🌤️✨",
    "09:00 AM": "⌚┆এখন সকাল ৯টা বাজে❥︎চল কাজে মন দিই!🕘",
    "10:00 AM": "⌚┆এখন সকাল ১০টা বাজে❥︎তোমাদের মিস করছি,🌞☀️",
    "11:00 AM": "⌚┆এখন সকাল ১১টা বাজে❥︎কাজ চালিয়ে যাও!😌",
    "12:00 PM": "⌚┆এখন দুপুর ১২টা বাজে❥︎ভালোবাসা জানাও সবাইকে,❤️",
    "01:00 PM": "⌚┆এখন দুপুর ১টা বাজে❥︎জোহরের নামাজ পড়ে নাও,🙇🤲",
    "02:00 PM": "⌚┆এখন দুপুর ২টা বাজে❥︎দুপুরের খাবার খেয়েছো তো?🍛🌤️",
    "03:00 PM": "⌚┆এখন বিকাল ৩টা বাজে❥︎কাজে ফোকাস করো,🧑‍🔧☀️",
    "04:00 PM": "⌚┆এখন বিকাল ৪টা বাজে❥︎আসরের নামাজ পড়ে নাও,🙇🥀",
    "05:00 PM": "⌚┆এখন বিকাল ৫টা বাজে❥︎একটু বিশ্রাম নাও,🙂‍↕️🌆",
    "06:00 PM": "⌚┆এখন সন্ধ্যা ৬টা বাজে❥︎পরিবারকে সময় দাও,😍🌇",
    "07:00 PM": "⌚┆এখন সন্ধ্যা ৭টা বাজে❥︎এশার নামাজ পড়ো,❤️🌃",
    "08:00 PM": "⌚┆এখন রাত ৮টা বাজে❥︎আজকের কাজ শেষ করো,🧖🙂‍↔️",
    "09:00 PM": "⌚┆এখন রাত ৯টা বাজে❥︎ঘুমের প্রস্তুতি নাও,😴🌙",
    "10:00 PM": "⌚┆এখন রাত ১০টা বাজে❥︎ঘুমাতে যাও, স্বপ্নে দেখা হবে,😴🙂‍↕️",
    "11:00 PM": "⌚┆এখন রাত ১১টা বাজে❥︎ভালোবাসা রইলো,🥰🌌"
  };

  const videoURL = "https://files.catbox.moe/sv29c7.mp4";
  const cacheDir = path.join(__dirname, "cache");
  const videoPath = path.join(cacheDir, "autotimer.mp4");

  console.log("✅ AutoTimer Ultra Loaded...");

  // 👉 Ensure cache folder
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  // 👉 Download video once
  if (!fs.existsSync(videoPath)) {
    try {
      const res = await axios.get(videoURL, { responseType: "arraybuffer" });
      fs.writeFileSync(videoPath, Buffer.from(res.data));
      console.log("📥 Video downloaded");
    } catch (err) {
      console.error("❌ Video download failed:", err);
    }
  }

  let lastSentTime = "";

  const checkTimeAndSend = async () => {
    const now = moment().tz("Asia/Dhaka").format("hh:mm A");

    if (now !== lastSentTime && timerData[now]) {
      lastSentTime = now;

      const todayDate = moment().tz("Asia/Dhaka").format("DD-MM-YYYY");

      const msg =
`◢◤━━━━━━━━━━━━━━━━◥◣
🕒>ᴛɪᴍᴇ: ${now}
${timerData[now]}
◥◣━━━━━━━━━━━━━━━━◢◤
📅>ᴅᴀᴛᴇ: ${todayDate}
━━━━━━━━━━━━━━━━━━━━
ʙᴏᴛ ᴏᴡɴᴇʀ:-ꜰᴀʀʜᴀɴ-ᴋʜᴀɴ
━━━━━━━━━━━━━━━━━━━━`;

      try {
        const allThreads = await api.getThreadList(1000, null, ["INBOX"]);
        const groups = allThreads.filter(t => t.isGroup);

        await Promise.all(
          groups.map(thread =>
            api.sendMessage({
              body: msg,
              attachment: fs.createReadStream(videoPath)
            }, thread.threadID)
          )
        );

        console.log("✅ Message sent:", now);
      } catch (e) {
        console.error("❌ Error:", e);
      }
    }
  };

  setInterval(checkTimeAndSend, 30000);
};

module.exports.onStart = () => {};
