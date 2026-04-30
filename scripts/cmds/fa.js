const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

// 🧠 Memory
const userCooldown = new Map();
const userReplyCount = new Map();
const bannedUsers = new Set();

// 🧠 message tracker (delete system)
const botMessages = new Set();

module.exports = {
  config: {
    name: "fa",
    version: "7.3.0",
    author: "MR_FARHAN + REACTION DELETE",
    countDown: 0,
    role: 0,
    shortDescription: "Reply + Mention Angry Voice System",
    longDescription: "Full system with reaction delete",
    category: "system"
  },

  onStart: async function () {},

  // 🔊 VOICE SEND
  async sendVoice(message, api, url) {
    try {
      const filePath = path.join(__dirname, "cache", `voice_${Date.now()}.mp4`);
      const res = await axios.get(url, { responseType: "arraybuffer" });

      fs.writeFileSync(filePath, res.data);

      const sent = await message.reply({
        body: "🔊 VOICE REPLY",
        attachment: fs.createReadStream(filePath)
      });

      // 🧠 track message
      botMessages.add(sent.messageID);

      fs.unlinkSync(filePath);
    } catch (err) {
      console.log("Voice Error:", err);
    }
  },

  // 🧹 REACTION DELETE
  onReaction: async function ({ event, api }) {
    try {
      const adminIDs = ["61560326905548", "61565260035199"].map(String);
      const userID = String(event.userID);

      // ❌ শুধু admin পারবে
      if (!adminIDs.includes(userID)) return;

      const allowedEmojis = ["🪬", "😾", "🤖"];

      if (!allowedEmojis.includes(event.reaction)) return;

      const messageID = event.messageID;

      // ❌ শুধু bot message delete হবে
      if (!botMessages.has(messageID)) return;

      if (api?.unsendMessage) {
        api.unsendMessage(messageID);
      }

      // remove from memory
      botMessages.delete(messageID);

    } catch (e) {}
  },

  onChat: async function ({ event, message, api }) {

    const adminIDs = ["61560326905548", "61565260035199"].map(String);
    const senderID = String(event.senderID);

    if (bannedUsers.has(senderID)) return;
    if (adminIDs.includes(senderID)) return;

    let isTarget = false;

    const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
    if (adminIDs.some(id => mentionedIDs.includes(id))) {
      isTarget = true;
    }

    if (event.type === "message_reply") {
      const repliedUser = event.messageReply.senderID;
      if (adminIDs.includes(String(repliedUser))) {
        isTarget = true;
      }
    }

    if (!isTarget) return;

    const COOLDOWN = 2500;
    const MAX_REPLY = 3;

    const now = Date.now();
    const lastTime = userCooldown.get(senderID) || 0;
    const count = userReplyCount.get(senderID) || 0;

    if (now - lastTime < COOLDOWN) return;

    userCooldown.set(senderID, now);

    let prefix = global.GoatBot?.config?.prefix || "/";
    let totalCommands = global.GoatBot?.commands?.size || "Unknown";

    if (count >= MAX_REPLY) {
      bannedUsers.add(senderID);

      const msg = await message.reply(`
╔═══════『 NIJHUM BOT 』═══════╗

⚠️ তুই স্প্যাম করতেছিস  মাদারচোদ!
🚫 তোরে আর কোনো রিপ্লাই দেওয়া হবে না!

╭───────────────╮
│ 🕒 ${moment.tz("Asia/Dhaka").format("hh:mm A")}
│ 📅 ${moment.tz("Asia/Dhaka").format("DD MMMM YYYY")}
│ ⚙️ CMD : ${totalCommands}
│ 🔰 PREFIX : ${prefix}
╰───────────────╯

══════『 BOT OWNER 』══════
UDAY HASAN SIYAM
`);

      botMessages.add(msg.messageID);
      return;
    }

    userReplyCount.set(senderID, count + 1);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(Math.floor(Math.random() * 2000) + 800);

    const voiceLinks = [
      "https://files.catbox.moe/lipbk9.mp4",
      "https://files.catbox.moe/kk27f0.mp4",
      "https://files.catbox.moe/rtwe66.mp4"
    ];

    if (Math.random() < 0.4) {
      const randomVoice = voiceLinks[Math.floor(Math.random() * voiceLinks.length)];
      return this.sendVoice(message, api, randomVoice);
    }

    const REPLIES = [
      "সিয়াম বস কে মেনশন দিলে তোর নানির খালি ঘর 😩🐸",
      "সিয়াম বস এক আবাল তুমারে ডাকতেছে 😂😏",
      "বুকাচুদা তুই মেনশন দিবি না আমার বস সিয়াম রে 🥹",
      "মেনশন দিছস আর বেচে যাবি? দাড়া বলতাছি 😠",
      "তুই আবার বসরে  মেনশন দিস? সাহস কম না বোকাচোদা🔥😡",
      "⚡ তোর সাহস কত বড় হইছে রে! বসরে মেনশন করস আবাল 😤",
      "🚫 বস VIP মানুষ, ফালতু  মেনশন বন্ধ কর 😎 না হলে তোর নানির খালি ঘর 😌",
      "🔥 আগুন নিয়ে খেলতেছস! বসরে ডাকস 😡",
      "😏 তুই বুঝি বড় হইছস? বসরে মেনশন দিস!",
      "💀 RIP তোর ইজ্জত! বসরে ডাকলি 😂 তোমার আম্মুর ওইখানে উম্মাহ 🙈",
      "🧠 ব্রেইন লোডিং... বসরে  মেনশন কেন? 🤨 করলি মাদারচোদ 🙄",
      "😤 তোরে বলছি শেষবার—বসরে  মেনশন করিস না! 😌না হলে তোমার বোনের 🙈 পমপম খামু 😴",
      "👑 বস কিং, তুই  আবালচোদা! মেনশন দিবি? 😏",
      "⚠️ WARNING: আবার মেনশন দিলে  তোমাকে পোদ মারা হবে 😡",
      "😂 তোর লাইফ শেষ! বসরে ডাকছস!",
      "🔥 বসরে ট্যাগ = নিজের কবর খোঁড়া 😈",
      "😎 Boss busy bro! disturb korish na!",
      "💣 Boom! বসরে ট্যাগ করে নিজেই উড়লি 😆",
      "👿 তোরে ছাড়মু না, বসরে ট্যাগ দিস!",
      "😡 Limit cross! বসরে mention?!",
      "🚷 Restricted zone! Boss mention detected!",
      "😏 Hero hobar try kortesis? Boss ke tag!",
      "🔥 Respect maintain kor, Boss ke disturb na!",
      "💢 Rage mode ON! Boss mention detected!",
      "😤 Last warning! Boss ke tag bondho!"
    ];

    const randomReply = REPLIES[Math.floor(Math.random() * REPLIES.length)];

    const msg = await message.reply(`
╔═══════『 NIJHUM BOT 』═══════╗

${randomReply}

╭───────────────╮
│ 🕒 ${moment.tz("Asia/Dhaka").format("hh:mm A")}
│ 📅 ${moment.tz("Asia/Dhaka").format("DD MMMM YYYY")}
│ ⚙️ CMD : ${totalCommands}
│ 🔰 PREFIX : ${prefix}
╰───────────────╯

══════『 BOT OWNER 』══════
UDAY HASAN SIYAM
`);

    botMessages.add(msg.messageID);
  }
};
