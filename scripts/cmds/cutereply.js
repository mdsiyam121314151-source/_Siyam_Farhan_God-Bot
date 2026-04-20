const fs = require("fs-extra");
const path = require("path");
const https = require("https");

const AUTHOR = "FARHAN-KHAN"; // 🔒 LOCKED AUTHOR

exports.config = {
  name: "cutereply",
  version: "2.1.0",
  author: AUTHOR,
  countDown: 0,
  role: 0,
  shortDescription: "Reply with text + image on trigger",
  longDescription: "Trigger মেসেজে reply দিয়ে text + image পাঠাবে",
  category: "system"
};

// =======================
// 🔒 AUTHOR LOCK SYSTEM
// =======================
if (exports.config.author !== AUTHOR) {
  console.log("❌ AUTHOR CHANGED! FILE LOCKED!");
  process.exit(1);
}

// =======================

const cooldown = 10000; // 10 sec
const last = {};

// =======================
// ✨ EASY ADD SECTION ✨
// =======================
const TRIGGERS = [
  {
    words: ["siyam", "Siyam", "সিয়াম ভাই", "সিয়াম"],
    text: "👉আমার বস🐮 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো ‎‎‎‎‎‎‎‎‎[https://facebook.com/61568411310748] 🔰 ♪√বস ফ্রি হলে আসবে,! 😜🐒⚠️ সাবধান বুঝে শুনে নক দিও 😈🔥 👑 বস সিয়ামের গার্লফ্রেন্ড মাদিহা আছে 💖⚡",
    images: [
      "https://i.imgur.com/Q8IpXi2.jpeg"
    ]
  },
  {
    words: ["@নি্ঁঝু্ঁম্ঁ রা্ঁতে্ঁর্ঁ প্ঁরী্ঁ", "@নিঝুম", "@বট"],
    text: "-🤖 জানু, আমাকে মেনশন দিয়ে লাভ নাই 😏💬- কারণ আমি একটা ম্যাসেঞ্জার রোবট, শুধু মজার জন্য বানানো হইছে 😄⚡,🤖 আমাকে বানানো হয়েছে শুধুমাত্র আপনাদেরকে বিনোদনের জন্য, আমাকে বানিয়েছেন আমার বস সিয়াম হাসান-😽🫶 চাইলে আপনিও আপনার গ্রুপে নিতে পারেন [https://facebook.com/61568411310748",
    images: [
      "https://i.imgur.com/rkrXNso.jpeg",
      "https://i.imgur.com/zrpFJUc.jpeg"
    ]
  }
];
// =======================

exports.onStart = async function () {};

exports.onChat = async function ({ event, api }) {
  try {
    const { threadID, senderID, messageID } = event;
    const body = (event.body || "").toLowerCase().trim();
    if (!body) return;

    // bot নিজের মেসেজ ignore
    if (senderID === api.getCurrentUserID()) return;

    // cooldown
    const now = Date.now();
    if (last[threadID] && now - last[threadID] < cooldown) return;

    let matched = null;
    for (const t of TRIGGERS) {
      if (t.words.some(w => body.includes(w))) {
        matched = t;
        break;
      }
    }
    if (!matched) return;

    last[threadID] = now;

    const imgUrl = matched.images[Math.floor(Math.random() * matched.images.length)];
    const imgName = path.basename(imgUrl);
    const imgPath = path.join(__dirname, imgName);

    if (!fs.existsSync(imgPath)) {
      await download(imgUrl, imgPath);
    }

    // 🔥 reply message
    api.sendMessage(
      {
        body: matched.text,
        attachment: fs.createReadStream(imgPath)
      },
      threadID,
      messageID
    );

  } catch (e) {
    console.log(e);
  }
};

// =======================
// DOWNLOAD FUNCTION
// =======================
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return reject();
      }

      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", () => {
      fs.unlink(dest, () => {});
      reject();
    });
  });
}
