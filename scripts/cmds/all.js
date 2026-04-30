const fs = require("fs");

const AUTHOR = "SIYAM"; // 🔒 DO NOT CHANGE

module.exports = {
	config: {
		name: "all",
		version: "2.1",
		author: AUTHOR, // 🔒 LOCKED
		countDown: 5,
		role: 1,
		description: {
			en: "Tag all members with stylish message"
		},
		category: "box chat"
	},

	onStart: async function ({ message, event }) {

		// 🔒 AUTHOR LOCK SYSTEM
		if (module.exports.config.author !== AUTHOR) {
			console.log("⛔ AUTHOR MODIFIED! FILE LOCKED.");
			process.exit(1);
		}

		try {
			const { participantIDs } = event;
			const mentions = [];

			// ✅ FIX: auto bot name + prefix
			const botName = global.config?.BOTNAME || "UNKNOWN BOT";
			const prefix = global.config?.PREFIX || "/";

			// 🔥 Stylish Message (UNCHANGED)
			let body = `╔═══❖ 👑 𝐑𝐎𝐘𝐀𝐋 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 👑 ❖═══╗
┃
┃ 📢 𝐀𝐓𝐓𝐄𝐍𝐓𝐈𝐎𝐍 𝐄𝐕𝐄𝐑𝐘𝐎𝐍𝐄 📢
┃
┣━━━━━━━━━━━━━━━━━━━┫
┃ 👥 @everyone
┃ 🚨 চিপা থেকে বাহির 📢..
┃👺 ..হও এখনই🤬🤷!
┃
┃ ❗ 🌚একটা করে🤭
┃  😁 ☺️..জামাই দিমু😽🐸...
┃ ❄️ 🌝আর একটা🤐
┃ 😋  করে বউ 😼🐸
┃
┃ 👑 এখনো বের হলি না😾
┃ 📢 দাঁড়া আসতেছি🐸..
┃ 
┃ 😸চিপার মধ্যে
┃ 👺বরফ দিমু 😼🐸..
┃
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🤖 𝐁𝐎𝐓: ${botName}
┃ ⚙️ 𝐏𝐑𝐄𝐅𝐈𝐗: ${prefix}
┃
┣━━━━━━━━━━━━━━━━━━━┫
┃ 🔗 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊:
┃ 🌐 https://facebook.com/61560326905548
┃
┣━━━━━━━━━━━━━━━━━━━┫
┃ ⚡ 𝐑𝐄𝐒𝐏𝐄𝐂𝐓 𝐓𝐇𝐄 𝐁𝐎𝐒𝐒 😎
┃ 🔒 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 ${botName}
┃
╚═══❖ ✨ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐒𝐘𝐒𝐓𝐄𝐌 ✨ ❖═══╝`;

			// ✅ safe mention index
			let index = body.indexOf("@everyone");
			if (index < 0) index = 0;

			for (const uid of participantIDs) {
				mentions.push({
					tag: "@",
					id: uid,
					fromIndex: index
				});
			}

			return message.reply({ body, mentions });

		} catch (err) {
			console.error(err);
			return message.reply("❌ Error:\n" + err.message);
		}
	}
};
