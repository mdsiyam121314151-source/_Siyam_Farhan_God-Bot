const fs = require("fs-extra");

module.exports = {
  config: {
    name: "farhan_mention",
    version: "7.0.0",
    author: "Farhan-Khan", // ⚠️ এটা change করলে bot বন্ধ হয়ে যাবে
    countDown: 0,
    role: 0,
    shortDescription: "Admin mention reply styled",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    // 🔒 AUTHOR LOCK
    if (this.config.author !== "Farhan-Khan") {
      console.log("⚠️ Author changed! Module stopped.");
      return;
    }

    // 👑 ADMINS
    const admins = [
      {
        uid: "61568411310748",
        names: ["@তো্ঁমা্ঁগো্ঁ পি্ঁচ্ছি্ঁ উ্ঁদয়্ঁ তা্ঁহ"]
      },
      {
        uid: "61584641872032",
        names: ["@তো্ঁমা্ঁগো্ঁ পি্ঁচ্ছি্ঁ ত্যা্ঁহ্ঁ"]
      }
    ];

    const senderID = String(event.senderID);

    // ❌ Admin নিজে লিখলে reply দিবে না
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase().trim();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    // 🔍 MENTION DETECT
    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      text.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );

    if (!isMentioning) return;

    // 💬 RAW CAPTIONS
    const captions = [
      "Mantion_দিস না _সিয়াম বস এর মন মন ভালো নেই আস্কে-!💔🥀",
      "- আমার বস সিয়াম এর সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
      "👉আমার বস ♻️ 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো 🪶 ♪√বস ফ্রি হলে আসবে🧡😁😜🐒https://facebook.com/61568411310748",
      "বস সিয়াম কে এত মেনশন না দিয়ে বক্স আসো হট করে দিবো🤷‍ঝাং 😘🥒",
      "বস সিয়াম কে Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",
      "সিয়াম বস এখন বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
      "সিয়াম বস কে এতো মেনশন নাহ দিয়া বস কে একটা জি এফ দে 😒 😏",
      "Mantion_না দিয়ে বস সিয়াম এর সাথে সিরিয়াস প্রেম করতে চাইলে ইনবক্স 🪶https://facebook.com/61568411310748",
      "বস সিয়াম কে মেনশন দিসনা পারলে একটা জি এফ দে",
      "বাল পাকনা Mantion_দিস না বস সিয়াম প্রচুর বিজি আছে 🥵🥀🤐",
      "চুমু খাওয়ার বয়স টা আমার বস সিয়াম মাদিহা কে🍫খেয়ে উড়িয়ে দিল 🤗"
    ];

    const formatCaption = (text) => {
      return `
━━━━━━━━━━━━━━━━━━━━
- ${text}
━━━━━━━━━━━━━━━━━━━━
   [>ʙᴏᴛ ᴏᴡɴᴇʀ:-ꜱɪʏᴀᴍ-ʜᴀꜱᴀɴ<]
━━━━━━━━━━━━━━━━━━━━
      `;
    };

    const rawCaption = captions[Math.floor(Math.random() * captions.length)];
    const styledCaption = formatCaption(rawCaption);

    try {
      await message.reply({
        body: styledCaption
      });
    } catch (err) {
      console.log("Error sending admin reply:", err);
    }
  }
};
