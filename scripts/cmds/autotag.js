const axios = require("axios");

const AUTHOR = "SIYAM";
const autoTagThreads = new Map();

module.exports = {
	config: {
		name: "autotag",
		version: "6.0",
		author: AUTHOR,
		countDown: 5,
		role: 1,
		category: "box chat"
	},

	onStart: async function ({ message, event, args, api }) {

		if (module.exports.config.author !== AUTHOR) {
			process.exit(1);
		}

		const threadID = event.threadID;

		if (args[0] === "off") {
			if (autoTagThreads.has(threadID)) {
				clearInterval(autoTagThreads.get(threadID));
				autoTagThreads.delete(threadID);
				return message.reply("❌ AUTO TAG OFF");
			}
			return message.reply("⚠️ Already OFF");
		}

		if (autoTagThreads.has(threadID)) {
			return message.reply("⚠️ Already ON");
		}

		const interval = setInterval(async () => {
			try {
				const threadInfo = await api.getThreadInfo(threadID);
				const participantIDs = threadInfo.participantIDs;

				// ⏰ TIME & DATE
				const now = new Date();
				const time = now.toLocaleTimeString("en-BD");
				const date = now.toDateString();

				// 🌦️ WEATHER
				let weather = "Loading...";
				try {
					const res = await axios.get("https://wttr.in/Dhaka?format=3");
					weather = res.data;
				} catch {}

				// 🎭 RANDOM EMOJI
				const emojis = ["🔥","💀","😈","⚡","👑","💣"];
				const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

				let body = `
╔═══❖•ೋ° 🌟 °ೋ•❖═══╗
📢 𝐀𝐓𝐓𝐄𝐍𝐓𝐈𝐎𝐍 ${randomEmoji} 𝐄𝐕𝐄𝐑𝐘𝐎𝐍𝐄 📢
╚═══❖•ೋ° 🌟 °ೋ•❖═══╝

👥 @everyone
🚨 চিপা থেকে বাহির হও এখনই!
😴বস সিয়াম রাগ 😡 করবে 😓👈

⏰ TIME: ${time}
📅 DATE: ${date}
🌦️ WEATHER: ${weather}

☎️whatsapp:+8801789138157

━━━━━━━━━━━━━━━━━━━

👑🔥 VIRTUAL KING 👑🔥👑
⚔️😈 নাম: উদয় হাসান সিয়াম 💀✨
🏡🌪️ বাসা: কিশোরগঞ্জ, বাংলাদেশ 🇧🇩🔥
📚📌 পড়ালেখা: ক্লাস ১০ 🏫⚡
🎂🔥 বয়স: ১৭+ 😎💣
💔🖤 স্ট্যাটাস: সিঙ্গেল 😈🥀
🏫📖 স্কুল: এম এ মান্নান মানিক উচ্চ বিদ্যালয় 🏫👀
👨‍🎓⚡ কাজ: স্টুডেন্ট 💥📘

👁️‍🗨️🔥 ATTITUDE LINE:
😈⚔️ আমি শান্ত থাকি মানে এই না যে দুর্বল…
💀🔥 সময় আসলে নামটাই যথেষ্ট ভয়ের জন্য!
🖤👑 VIRTUAL KING — নামটাই স্টাইল, কাজটাই ডেঞ্জার! 💣🔥

━━━━━━━━━━━━━━━━━━━

🔗 Facebook Link:
🌐 https://www.facebook.com/profile.php?id=61568411310748 ✨

━━━━━━━━━━━━━━━━━━━

⚡ Respect the Boss 😎
`;

				let index = body.indexOf("@everyone");
				const mentions = [];

				for (const uid of participantIDs) {
					mentions.push({
						tag: "@",
						id: uid,
						fromIndex: index
					});
				}

				api.sendMessage({ body, mentions }, threadID);

			} catch (err) {
				console.log(err);
			}

		}, 5 * 60 * 1000);

		autoTagThreads.set(threadID, interval);

		return message.reply("✅ ULTRA AUTO TAG STARTED 👑🔥");
	}
};
