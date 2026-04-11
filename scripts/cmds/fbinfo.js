module.exports = {
  config: {
    name: "fbinfo",
    aliases: ["fb", "userinfo"],
    version: "1.1",
    author: "FARHAN-KHAN",
    role: 0,
    shortDescription: "Facebook user info",
    longDescription: "Get Facebook user info safely",
    category: "info",
    guide: "{p}fbinfo @mention | uid"
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      let uid = event.senderID;

      if (Object.keys(event.mentions || {}).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } else if (args[0] && !isNaN(args[0])) {
        uid = args[0];
      }

      const data = await api.getUserInfo(uid);
      const user = data[uid];

      if (!user) return message.reply("❌ User info not found");

      const gender =
        user.gender == 1 ? "Female" :
        user.gender == 2 ? "Male" : "Unknown";

      return message.reply(
`📘 FACEBOOK USER INFO

👤 Name: ${user.name || "Unknown"}
🆔 UID: ${uid}
👤 Username: ${user.vanity || "Not set"}
🚻 Gender: ${gender}
🔗 Profile: https://facebook.com/${uid}

─꯭─⃝͎̽𓆩𝐅𝐀𝐑𝐇𝐀𝐍 𝐀𝐑 𝐁𝐎𝐓‣᭄𓆪`
      );

    } catch (err) {
      return message.reply("⚠️ Error: fbinfo install version failed");
    }
  }
};
