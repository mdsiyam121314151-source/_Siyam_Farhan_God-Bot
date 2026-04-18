const axios = require('axios');

// Fetching dynamic API URL from GitHub
const getBaseApiUrl = async () => {
    try {
        const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
        return base.data.mahmud;
    } catch (e) {
        return "https://noobs-api.top"; // Fallback URL
    }
};

// শুধু "bot" ট্রিগার হিসেবে থাকবে
const triggerWords = ["bot"];

const LOCKED_AUTHOR = "FARHAN-KHAN";

module.exports = {
    config: {
        name: "bot",
        aliases: ["Bot", "বট"],
        version: "11.1.0",
        author: "FARHAN-KHAN", // 🔒 LOCKED AUTHOR
        countDown: 0,
        role: 0,
        description: "Bot responds only to 'bot' trigger with funny dialogues or AI.",
        category: "fun",
        guide: { 
            en: "{pn} [text]\n{pn} teach [q] - [a]\n{pn} list" 
        }
    },

    onStart: async function ({ api, event, args, usersData, commandName }) {
        const { threadID, messageID, senderID } = event;
        const baseUrl = await getBaseApiUrl();

        try {
            const name = await usersData.getName(senderID);

            if (!args[0]) {
                return api.sendMessage({
                    body: `𓆩» ${name} «𓆪\nবলুন আমি "বট" আপনাকে কিভাবে সাহায্য করতে পারি? 😘`,
                    mentions: [{ tag: name, id: senderID }]
                }, threadID, (err, info) => {
                    if (!err) global.GoatBot?.onReply?.set(info.messageID, { commandName, author: senderID });
                }, messageID);
            }

            const action = args[0].toLowerCase();

            if (action === "teach") {
                const input = args.slice(1).join(" ");
                const [trigger, ...responsesArr] = input.split(" - ");
                const responses = responsesArr.join(" - ");
                if (!trigger || !responses) return api.sendMessage("⚠️ Format: teach ask - reply", threadID, messageID);

                const res = await axios.post(`${baseUrl}/api/jan/teach`, {
                    trigger,
                    responses,
                    userID: senderID
                });

                return api.sendMessage(`✅ Added: ${trigger} -> ${responses}`, threadID, messageID);
            }

            // Default AI Response
            const res = await axios.post(`${baseUrl}/api/hinata`, { 
                text: args.join(" "), 
                style: 3, 
                attachments: event.attachments || [] 
            });

            return api.sendMessage(res.data.message, threadID, (err, info) => {
                if (!err) global.GoatBot?.onReply?.set(info.messageID, { commandName, author: senderID });
            }, messageID);

        } catch (err) {
            return api.sendMessage("API Busy! ❌", threadID, messageID);
        }
    },

    onReply: async function ({ api, event, commandName }) {
        if (api.getCurrentUserID() == event.senderID) return;

        try {
            const baseUrl = await getBaseApiUrl();
            const res = await axios.post(`${baseUrl}/api/hinata`, { 
                text: event.body?.toLowerCase() || "hi", 
                style: 3, 
                attachments: event.attachments || [] 
            });

            return api.sendMessage(res.data.message, event.threadID, (err, info) => {
                if (!err) global.GoatBot?.onReply?.set(info.messageID, { commandName, author: event.senderID });
            }, event.messageID);

        } catch (err) {}
    },

    onChat: async function ({ api, event, usersData, commandName }) {
        const { body, senderID, threadID, messageID } = event;
        if (!body) return;

        const lowerBody = body.toLowerCase();

        // চেক করবে মেসেজটি "bot" দিয়ে শুরু হয়েছে কি না
        if (triggerWords.some(word => lowerBody.startsWith(word))) {
            const text = body.replace(/^bot\s*/i, "").trim();

            if (!text) {
                const name = await usersData.getName(senderID);

                const randomReplies = [
                    "🌻🌺💚-আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","আমাকে না ডেকে আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 কে একটা জি এফ দাও-😽🫶🌺💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","ঝাং থুমালে আইলাপিউ পেপি-💝😽","উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈","জান তোমার নানি'রে আমার হাতে তুলে দিবা-🙊🙆‍♂","আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧","ঝাং 🫵থুমালে য়ামি রাইতে পালুপাসি উম্মম্মাহ-🌺🤤💦","চুনা ও চুনা আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর হবু বউ মাদিহা রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻","জান হাঙ্গা করবা-🙊😝🌻","জান মেয়ে হলে চিপায় আসো সিয়াম বস এর থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽","ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤🌼","আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶 আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর  জন্য দোয়া করবেন-💝💚🌺🌻💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","- ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর ইনবক্স চলে যাও-🙊🥱👅 🌻𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 𝐋𝐈𝐍𝐊 🌻:- [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","জান তুমি শুধু আমার বস সিয়াম এর বস সিয়াম তোমারে ৩৬৫ দিন ভালোবাসে-💝🌺😽","জান বাল ফালাইবা-🙂🥱🙆‍♂","-আন্টি-🙆-আপনার মেয়ে-👰‍♀️-রাতে আমারে ভিদু কল দিতে বলে🫣-🥵🤤💦","oii-🥺🥹-এক🥄 চামচ ভালোবাসা দিবা-🤏🏻🙂","-আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 কে দান করেন-🥱🐰🍒💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","-ও মিম ও মিম-😇-তুমি কেন চুরি করলা বস সিয়াম এর গার্লফ্রেন্ড মাদিহার ফর্সা হওয়ার ক্রীম-🌚🤧","-অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 কে-🐸😾🔪💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","-𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-🥲🤦‍♂️🤧","-𝗢𝗶𝗶 আন্টি-🙆‍♂️-তোমার মেয়ে চোখ মারে-🥺🥴🐸","তাকাই আছো কেন চুমু দিবা-🙄🐸😘","আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇","-বস সিয়াম এর গল্পে মাদিহা সেরা-🙊🙆‍♂️🤗","কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻","দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧","-তাবিজ কইরা হইলেও ফ্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻","-ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻","-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 ধরতে পারছে না-🐸🥲","-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️","—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂-আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","—হাজারো লুচ্চা লুচ্চির ভিরে-🙊🥵আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এক নিস্পাপ ভালো মানুষ-🥱🤗🙆‍♂️💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","-রূপের অহংকার করো না-🙂❤️চকচকে সূর্যটাও দিনশেষে অন্ধকারে পরিণত হয়-🤗💜","সুন্দর মাইয়া মানেই-🥱আমার বস 亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 এর বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗","এত অহংকার করে লাভ নেই-🌸মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂","-দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছে বস সিয়াম-🙂😿🌸💙 Facebook Link: [https://www.facebook.com/profile.php?id=61568411310748] 🌐✨","হুদাই আমারে  শয়তানে লারে-😝😑☹️","-𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽-আহারে ভাবছো তোমারে প্রোপজ করছি-🥴-থাপ্পর দিয়া কিডনী লক করে দিব-😒-ভুল পড়া বের করে দিবো-🤭🐸","-আমি একটা দুধের শিশু-😇-🫵𝗬𝗢𝗨🐸💦","-কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧"
                ];

                const rand = randomReplies[Math.floor(Math.random() * randomReplies.length)];

                return api.sendMessage({
                    body: `𓆩» ${name} «𓆪\n\n${rand}`,
                    mentions: [{ tag: name, id: senderID }]
                }, threadID, messageID);
            }

            try {
                const baseUrl = await getBaseApiUrl();
                const { data } = await axios.post(`${baseUrl}/api/hinata`, { text: text, style: 3 });
                api.sendMessage(data.message, threadID, messageID);
            } catch (err) {}
        }
    }
};

// 🔒 AUTHOR LOCK (FULL PROTECTION)
if (module.exports.config.author !== "FARHAN-KHAN") {
    console.log("❌ AUTHOR CHANGED! BOT STOPPED");
    process.exit(1);
    }
