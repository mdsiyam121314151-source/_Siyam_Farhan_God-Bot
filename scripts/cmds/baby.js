const axios = require("axios");

const mahmud = [
  "baby","bby","babu","nijhum","jan","bot",
  "জান","জানু","বেবি","wifey","নিঝুম"
];

const baseApiUrl = async () => {
  try {
    const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
    return base.data.mahmud;
  } catch {
    return "https://hinata-api.up.railway.app";
  }
};

module.exports = {
  config: {
    name: "nijhum",
    aliases: ["baby","bby","bbu","jan","janu","wifey","bot"],
    version: "2.1",
    author: "siyam",
    countDown: 2,
    role: 0,
    description: {
      bn: "Hinata AI Chat",
      en: "Hinata AI Chat"
    },
    category: "chat"
  },

  // ✅ COMMAND CHAT
  onStart: async function ({ api, event, args, commandName }) {
    const uid = event.senderID;

    if (!args[0]) {
      return api.sendMessage("বলো বেবি 😘", event.threadID, event.messageID);
    }

    try {
      const baseUrl = await baseApiUrl();

      const res = await axios.post(`${baseUrl}/api/hinata`, {
        text: args.join(" "),
        style: 3
      });

      return api.sendMessage(res.data.message, event.threadID, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            author: uid
          });
        }
      }, event.messageID);

    } catch (err) {
      return api.sendMessage("❌ API সমস্যা হয়েছে", event.threadID, event.messageID);
    }
  },

  // ✅ AUTO CHAT
  onChat: async function ({ api, event, commandName }) {
    const message = event.body?.toLowerCase() || "";
    if (!message) return;

    const isTrigger = mahmud.some(word => message.includes(word));
    if (!isTrigger) return;

    api.setMessageReaction("🪬", event.messageID, () => {}, true);

    const randomReplies = [
      "babu khuda lagse🥺",
      "Hop beda😾,Boss বল boss😼",
      "আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘 ",
      "naw amr boss k message daw[ https://facebook.com/61560326905548 ]",
      "গোলাপ ফুল এর জায়গায় আমি দিলাম তোমায় মেসেজ",
      "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
      "𝗜 𝗹𝗼𝘃𝗲 𝘆𝗼𝐮__😘😘",
      "এটায় দেখার বাকি সিলো_🙂🙂🙂",
      "𝗕𝗯𝘆 𝗯𝗼𝗹𝗹𝗮 𝗽𝗮𝗽 𝗵𝗼𝗶𝗯𝗼 😒😒",
      "𝗕𝗲𝘀𝗵𝗶 𝗱𝗮𝗸𝗹𝗲 𝗮𝗺𝗺𝘂 𝗯𝗼𝗸𝗮 𝗱𝗲𝗯𝗮 𝘁𝗼__🥺",
      "বেশি bby Bbby করলে leave নিবো কিন্তু 😒😒",
      "__বেশি বেবি বললে কামুর দিমু 🤭🤭",
      "𝙏𝙪𝙢𝙖𝙧 𝙜𝙛 𝙣𝙖𝙞, 𝙩𝙖𝙮 𝙖𝙢𝙠 𝙙𝙖𝙠𝙨𝙤? 😂😂😂",
      "আমাকে ডেকো না,আমি ব্যাস্ত আসি🙆🏻‍♀",
      "𝗕𝗯𝘆 বললে চাকরি থাকবে না",
      "𝗕𝗯𝘆 𝗕𝗯𝘆 না করে আমার বস মানে, সিয়াম , সিয়াম ও তো করতে পারো😑?",
      "আমার সোনার বাংলা, তারপরে লাইন কি? 🙈",
      "🍺 এই নাও জুস খাও..!𝗕𝗯𝘆 বলতে বলতে হাপায় গেছো না 🥲",
      "হটাৎ আমাকে মনে পড়লো 🙄",
      "𝗕𝗯𝘆 বলে অসম্মান করচ্ছিছ,😰😿",
      "𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗹𝗾𝗸𝘂𝗺 🐤🐤",
      "আমি তোমার সিনিয়র আপু ওকে 😼সম্মান দেও🙁",
      "খাওয়া দাওয়া করসো 🙄",
      "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈",
      "আরে আমি মজা করার mood এ নাই😒",
      "𝗛𝗲𝘆 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲 বলো 😁😁",
      "আরে Bolo আমার জান, কেমন আসো? 😚",
      "একটা BF খুঁজে দাও 😿",
      "oi mama ar dakis na pilis 😿",
      "amr JaNu lagbe,Tumi ki single aso?",
      "আমাকে না দেকে একটু পড়তেও বসতে তো পারো 🥺🥺",
      "তোর বিয়ে হয় নি 𝗕𝗯𝘆 হইলো কিভাবে,,🙄",
      "আজ একটা ফোন নাই বলে রিপ্লাই দিতে পারলাম না_🙄",
      "চৌধুরী সাহেব আমি গরিব হতে পারি😾🤭 -কিন্তু বড়লোক না🥹 😫",
      "আমি অন্যের জিনিসের সাথে কথা বলি না__😏ওকে",
      "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
      "ভুলে জাও আমাকে 😞😞",
      "দেখা হলে কাঠগোলাপ দিও..🤗",
      "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺",
      "আগে একটা গান বলো, ☹ নাহলে কথা বলবো না 🥺",
      "বলো কি করতে পারি তোমার জন্য 😚",
      "কথা দেও আমাকে পটাবা...!! 😌",
      "বার বার Disturb করেছিস কোনো, আমার জানু এর সাথে ব্যাস্ত আসি 😋",
      "আমাকে না দেকে একটু পড়তে বসতেও তো পারো 🥺🥺",
      "বার বার ডাকলে মাথা গরম হয় কিন্তু 😑😒",
      "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈",
      "আজকে আমার mন ভালো নেই 🙉",
      "আমি হাজারো মশার Crush😓",
      "ছেলেদের প্রতি আমার এক আকাশ পরিমান শরম🥹🫣",
      "__ফ্রী ফে'সবুক চালাই কা'রন ছেলেদের মুখ দেখা হারাম 😌",
      "মন সুন্দর বানাও মুখের জন্য তো 'Snapchat' আছেই! 🌚"
    ];

    if (message.split(" ").length === 1) {
      const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
      return api.sendMessage(reply, event.threadID, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            author: event.senderID
          });
        }
      }, event.messageID);
    }

    try {
      const baseUrl = await baseApiUrl();

      const res = await axios.post(`${baseUrl}/api/hinata`, {
        text: message,
        style: 3
      });

      return api.sendMessage(res.data.message, event.threadID, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            author: event.senderID
          });
        }
      }, event.messageID);

    } catch (e) {
      console.error(e);
    }
  },

  // ✅ CONTINUE REPLY (MAIN FIX)
  onReply: async function ({ api, event, commandName }) {
    try {
      const baseUrl = await baseApiUrl();

      const res = await axios.post(`${baseUrl}/api/hinata`, {
        text: event.body || "hi",
        style: 3
      });

      return api.sendMessage(res.data.message, event.threadID, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            author: event.senderID
          });
        }
      }, event.messageID);

    } catch (err) {
      console.error(err);
    }
  }
};
