const fs = require("fs-extra");
const moment = require("moment-timezone");
const { config } = global.GoatBot;
const { client } = global;

// 🔒 LOCKED AUTHOR
const LOCKED_AUTHOR = "FARHAN-KHAN";

// ✨ Premium Compact Bengali Style
function premiumMsg(title, body) {
	const time = moment().tz("Asia/Dhaka").format("hh:mm:ss A");
	const date = moment().tz("Asia/Dhaka").format("DD MMM YYYY");

	return `╔═ 👑 𝑺𝑰𝒀𝑨𝑴 👑 ═╗
${title}
━━━━━━━━━━━━
${body}
━━━━━━━━━━━━
📅 ${date} | ⏰ ${time}
🤖 𝑵𝑰𝑱𝑯𝑼𝑴 𝑩𝑶𝑻`;
}

module.exports = {
	config: {
		name: "adminonly",
		aliases: ["adonly", "onlyad", "onlyadmin"],
		version: "3.2",
		author: LOCKED_AUTHOR,
		countDown: 5,
		role: 1,
		description: {
			en: "Toggle admin-only mode"
		},
		category: "owner"
	},

	onStart: function ({ args, message }) {

		// 🔒 AUTHOR LOCK
		if (module.exports.config.author !== LOCKED_AUTHOR) {
			module.exports.config.author = LOCKED_AUTHOR;
			fs.writeFileSync(__filename, fs.readFileSync(__filename, "utf8"));
		}

		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "on") value = true;
		else if (args[indexGetVal] == "off") value = false;
		else return message.SyntaxError();

		// 🔔 Notification Mode
		if (isSetNoti) {
			config.hideNotiMessage.adminOnly = !value;

			return message.reply(
				premiumMsg(
					value ? "🔔 নোটিফিকেশন চালু" : "🔕 নোটিফিকেশন বন্ধ",
					value
						? "⚠️ নন-এডমিন ব্যবহার করলে সতর্ক বার্তা দেখাবে"
						: "🤫 নন-এডমিন ব্যবহার করলে কোনো বার্তা দেখাবে না"
				)
			);
		}

		// 🔐 Admin Mode
		config.adminOnly.enable = value;
		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));

		if (value) {
			return message.reply(
				premiumMsg(
					"🔐 এডমিন মোড চালু",
					"🚫 এখন শুধু বস সিয়াম বট ব্যবহার করতে পারবে\n👑 সিয়াম বস ছাড়া কেউ এক্সেস পাবে না"
				)
			);
		} else {
			return message.reply(
				premiumMsg(
					"🔓 এডমিন মোড বন্ধ",
					"✅ এখন সবাই বট ব্যবহার করতে পারবে\n🎉 সবাই এনজয় করো"
				)
			);
		}
	}
};
