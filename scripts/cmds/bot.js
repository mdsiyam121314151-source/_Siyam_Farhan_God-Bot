const axios = require('axios');

const baseApiUrl = "https://noobs-api.top/dipto/baby";

module.exports = {
config: {
name: "bot",
aliases: ["mbot", "milonbot"],
version: "10.0.1",
author: "Milon (fixed by siyam)",
countDown: 0,
role: 0,
description: "High-speed bot with extra dialogues and fixed mentions",
category: "fun",
guide: { en: "{pn} [text]" }
},

// ✅ COMMAND
onStart: async function ({ api, event, args, usersData }) {
const { threadID, messageID, senderID } = event;

try {
const name = await usersData.getName(senderID);

if (!args[0]) {
return api.sendMessage({
body: `「 ${name} 」\nবলুন আমি "বট" আপনাকে কিভাবে সাহায্য করতে পারি?`,
mentions: [{ tag: name, id: senderID }]
}, threadID, messageID);
}

// ✅ TEACH SYSTEM
if (args[0] === 'teach') {
const [q, a] = args.slice(1).join(" ").split(/\s*-\s*/);
if (!q || !a) return api.sendMessage("⚠️ Format: teach ask - reply", threadID, messageID);

const { data } = await axios.get(`${baseApiUrl}?teach=${encodeURIComponent(q)}&reply=${encodeURIComponent(a)}&senderID=${senderID}`);
return api.sendMessage(`✅ Added: ${data.message}`, threadID, messageID);
}

// ✅ NORMAL CHAT
const { data } = await axios.get(`${baseApiUrl}?text=${encodeURIComponent(args.join(" "))}&senderID=${senderID}&font=1`);

return api.sendMessage(data.reply, threadID, (err, info) => {
if (!err && global.GoatBot?.onReply) {
global.GoatBot.onReply.set(info.messageID, {
commandName: "bot",
messageID: info.messageID,
author: senderID
});
}
}, messageID);

} catch {
return api.sendMessage("API Busy!", threadID, messageID);
}
},

// ✅ FIXED REPLY SYSTEM (MAIN FIX 🔥)
onReply: async ({ api, event, Reply }) => {
try {
// 🔒 only same user continues
if (event.senderID != Reply.author) return;

const { data } = await axios.get(
`${baseApiUrl}?text=${encodeURIComponent(event.body || "hi")}&senderID=${event.senderID}&font=1`
);

return api.sendMessage(data.reply, event.threadID, (err, info) => {
if (!err && global.GoatBot?.onReply) {
global.GoatBot.onReply.set(info.messageID, {
commandName: "bot",
messageID: info.messageID,
author: event.senderID
});
}
}, event.messageID);

} catch (err) {
return api.sendMessage("⚠️ Reply error!", event.threadID, event.messageID);
}
},

// ✅ AUTO CHAT
onChat: async ({ api, event, usersData }) => {
const { body, senderID, threadID, messageID } = event;
if (!body) return;

const lowerBody = body.toLowerCase();

if (
lowerBody.startsWith("bot") ||
lowerBody.startsWith("বট") ||
lowerBody.startsWith("দিসারি") ||
lowerBody.startsWith("bby") ||
lowerBody.startsWith("নিঝুম") ||
lowerBody.startsWith("বাল")
) {

const text = body.replace(/^(bot|বট|baby|bby|নিঝুম|nijhum)\s*/i, "").trim();

// ✅ NO TEXT → RANDOM REPLY
if (!text) {
const name = await usersData.getName(senderID);

const randomReplies = [
"𝗵𝗲 𝗯𝗼𝘁 𝗯𝗼𝘁 𝗰𝗵𝗶𝗹𝗹 𝗯𝗿𝗼!", 
"I love you 💝", 
"আমি 𓆩সিয়াম𓆪 বস এর সাথে বিজি আছি-😕😏",
"আমার বস 𓆩সিয়াম𓆪 কে একটা জি GF দাও-😽🫶", 
"জান তোমার নানি রে আমার হাতে তুলে দিবা-🙊🙆‍♂",
"𓆩সিয়াম𓆪 বস'এর হবু বউ রে কেও দেকছো?😪", 
"জান হাঙ্গা করবা-🙊😝",
"ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤", 
"তাকাই আছো কেন চুমু দিবা-🙄🐸😘",
"বেশি Bot Bot করলে leave নিবো কিন্তু😒", 
"তোর বাড়ি কি কিশোরগঞ্জ, পোড়াবাড়িয়া গ্রাম😵‍💫",
"মেয়ে হলে বস 𓆩সিয়াম𓆪 কে 𝐊𝐈𝐒𝐒 দে 😒", 
"চুমু খাওয়ার বয়স টা চকলেট🍫খেয়ে উড়িয়ে দিলো 𓆩সিয়াম𓆪 বস 🥺🤗",
"আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱", 
"জান বাল ফালাইবা-🙂🥱🙆‍♂",
"আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇", 
"দিনশেষে পরের BOW সুন্দর-☹️🤧",
"সুন্দর মাইয়া মানেই-🥱আমার বস 𓆩সিয়াম𓆪 এর বউ-😽🫶", 
"হা জানু , এইদিক এ আসো কিস দেই🤭 😘",
"আরে আমি মজা করার mood এ নাই😒", 
"আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘",
"আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস 𓆩সিয়াম𓆪 কে দান করেন-🥱🐰🍒",
"ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧", 
"অনুমতি দিলে কল দিতাম..!😒",
"জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽",
"বস 𓆩সিয়াম𓆪 এর সাথে কথা বলবো এখন , ডিস্টার্ব করিস না 😒", 
"বেশি বেশি বকবক করলে তোকে ব্লক মেরে দেবো কিন্তু-🐸",
"জানু তোমার জন্য আমার মনটা আই ঢাই করে 💖", 
"ওই যে দেখো 𓆩সিয়াম𓆪 বস যাচ্ছে , এক বালতি প্রেম দিয়ে দাও 🤭",

// NEW
"আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ 💚",
"আমি এখন বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর সাথে বিজি আছি আমাকে ডাকবেন না 😕😏",
"আমাকে না ডেকে আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 কে একটা জি এফ দাও 😽🫶",
"ঝাং থুমালে আইলাপিউ পেপি 💝😽",
"উফফ বুঝলাম না এতো ডাকছেন কেনো 😤😡😈",
"আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না 😪🤧",
"চুনা ও চুনা আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর হবু বউ মাদিহা রে কেও দেকছো 😪🤧😭",
"স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও 💝🌺",
"জান মেয়ে হলে চিপায় আসো 😽",
"আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর পক্ষ থেকে তোমারে এতো এতো ভালোবাসা 🥰",
"ভালোবাসা করতে চাইলে আমার বস এর ইনবক্সে যাও 😴",
"জান তুমি শুধু আমার বস সিয়াম তোমারে ৩৬৫ দিন ভালোবাসে 💝",
"ওই একটা চামচ ভালোবাসা দিবা 🥺",
"আমি একটা দুধের শিশু 😇",
"হুদাই আমারে শয়তানে লারে 😝",
"দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি 🙂",
"রূপের অহংকার করো না 🙂",
"এত অহংকার করে লাভ নেই মৃত্যু নিশ্চিত 🖤"
];

const rand = randomReplies[Math.floor(Math.random() * randomReplies.length)];

return api.sendMessage({
body: `「 ${name} 」\n\n${rand}`,
mentions: [{ tag: name, id: senderID }]
}, threadID, (err, info) => {
if (!err && global.GoatBot?.onReply) {
global.GoatBot.onReply.set(info.messageID, {
commandName: "bot",
messageID: info.messageID,
author: senderID
});
}
}, messageID);
}

// ✅ WITH TEXT → API CALL
try {
const { data } = await axios.get(`${baseApiUrl}?text=${encodeURIComponent(text)}&senderID=${senderID}&font=1`);

api.sendMessage(data.reply, threadID, (err, info) => {
if (!err && global.GoatBot?.onReply) {
global.GoatBot.onReply.set(info.messageID, {
commandName: "bot",
messageID: info.messageID,
author: senderID
});
}
}, messageID);

} catch (err) {}
}
}
};
