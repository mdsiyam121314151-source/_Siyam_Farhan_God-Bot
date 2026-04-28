const os = require("os");

module.exports = {
  config: {
    name: "botinfo",
    version: "6.1.0",
    author: "Siyam Hasan",
    countDown: 3,
    role: 0,
    shortDescription: "💎 Legendary Profile System",
    longDescription: "Ultra unique owner + bot + system full info",
    category: "owner",
  },

  onStart: async function ({ message }) {

    const start = Date.now();

    const now = new Date();
    const time = now.toLocaleTimeString("en-BD");
    const date = now.toLocaleDateString("en-BD");

    const hour = now.getHours();
    const dayStatus = (hour >= 6 && hour < 18) ? "🌞 Day Mode" : "🌙 Night Mode";

    const weathers = ["☀️ Sunny", "🌧 Rainy", "⛅ Cloudy", "🌩 Storm"];
    const weather = weathers[Math.floor(Math.random() * weathers.length)];

    const rainTime = `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60)} min`;

    const msgCount = Math.floor(Math.random() * 2000) + 200;
    const hours = Math.floor(Math.random() * 15) + 1;

    const level = Math.floor(msgCount / 150);
    const xp = msgCount % 150;

    const moods = ["😎 Chill", "🔥 Active", "💔 Sad", "😍 Love", "😴 Sleepy", "🤖 Focused"];
    const mood = moods[Math.floor(Math.random() * moods.length)];

    const power = Math.floor(Math.random() * 100);

    const missions = [
      "Complete 150 messages 💬",
      "Stay active for 2 hours ⏳",
      "Chat with 5 friends 😄",
      "Win a Free Fire match 🎮"
    ];
    const mission = missions[Math.floor(Math.random() * missions.length)];

    const uptime = process.uptime();
    const upH = Math.floor(uptime / 3600);
    const upM = Math.floor((uptime % 3600) / 60);

    const prefix = global.GoatBot?.config?.prefix || "!";
    const commands = global.GoatBot?.commands?.size || "Unknown";

    const ram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const cpu = os.cpus()[0].model;

    const uid = "SIYAM-" + Math.floor(Math.random() * 999999);
    const streak = Math.floor(Math.random() * 30) + 1;

    const ping = Date.now() - start;

    const security = ["🔐 Secure", "⚠️ Risk", "🛡 Protected"];
    const secStatus = security[Math.floor(Math.random() * security.length)];

    const network = Math.floor(Math.random() * 100) + " Mbps 🚀";
    const aiStatus = ["🤖 Online", "🧠 Learning", "⚡ Fast Mode"][Math.floor(Math.random() * 3)];

    const ranks = ["Bronze 🥉", "Silver 🥈", "Gold 🥇", "Diamond 💎", "Legend 👑"];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];

    const badges = ["🎖 Elite", "🔥 Pro", "💎 VIP", "⚡ Speedster"];
    const badge = badges[Math.floor(Math.random() * badges.length)];

    const music = ["🎧 Alone Night", "🎵 Sad Vibes", "🔥 Gaming Beat", "💔 Broken Heart"];
    const nowPlaying = music[Math.floor(Math.random() * music.length)];

    const serverLoad = Math.floor(Math.random() * 100) + "%";

    const powerBar = "▰".repeat(Math.floor(power / 10)) + "▱".repeat(10 - Math.floor(power / 10));
    const xpBar = "█".repeat(Math.floor(xp / 15)) + "░".repeat(10 - Math.floor(xp / 15));

    const luck = Math.floor(Math.random() * 100);
    const iq = Math.floor(Math.random() * 80) + 80;

    const relationship = ["💖 Secret Crush", "💔 Broken", "😎 Single Boss", "😍 In Love"];
    const loveStatus = relationship[Math.floor(Math.random() * relationship.length)];

    const energy = Math.floor(Math.random() * 100);
    const energyBar = "█".repeat(Math.floor(energy / 10)) + "░".repeat(10 - Math.floor(energy / 10));

    const achievements = [
      "🏆 Chat King",
      "🔥 Daily Grinder",
      "💎 VIP Member",
      "⚡ Fast Responder"
    ];
    const achievement = achievements[Math.floor(Math.random() * achievements.length)];

    const coins = Math.floor(Math.random() * 5000);
    const gems = Math.floor(Math.random() * 200);

    const language = ["🇧🇩 Bangla", "🇺🇸 English", "🌐 Mixed"];
    const lang = language[Math.floor(Math.random() * language.length)];

    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const text = `
╔══════════════════════════════╗
        💎 SIYAM PREMIUM CARD 💎
╚══════════════════════════════╝

👤 UDAY HASAN SIYAM
🎖 Rank: ${rank}
🏅 Badge: ${badge}
🆔 ${uid}

━━━━━━━━━━━━━━━━━━

📍 Kishoreganj, Bangladesh
🎓 Class: Ten
🎂 Age: 17+
💔 Status: Single

━━━━━━━━━━━━━━━━━━

📅 ${date}
⏰ ${time}
${dayStatus}
🌍 Zone: ${zone}

🌦 ${weather}
🌧 Rain: ${rainTime}

━━━━━━━━━━━━━━━━━━

📊 Activity
💬 ${msgCount} Messages
⏳ ${hours} Hours Active

📈 Level ${level}
${xpBar} (${xp}/150 XP)

🔥 Streak: ${streak} Days

━━━━━━━━━━━━━━━━━━

❤️ ${mood}
💘 Love: ${loveStatus}
⚡ Power: ${power}%
${powerBar}

🔋 Energy: ${energy}%
${energyBar}

🎯 ${mission}

━━━━━━━━━━━━━━━━━━

🧠 Stats
🍀 Luck: ${luck}%
🧠 IQ: ${iq}
🏆 Achievement: ${achievement}

💰 Coins: ${coins}
💎 Gems: ${gems}

━━━━━━━━━━━━━━━━━━

🤖 System Info
⚙️ Prefix: ${prefix}
📦 Commands: ${commands}
⏱ Uptime: ${upH}h ${upM}m
📡 Ping: ${ping}ms

💻 CPU: ${cpu}
🧠 RAM: ${freeRam}GB / ${ram}GB

🌐 Network: ${network}
🛡 Security: ${secStatus}
⚡ AI Status: ${aiStatus}

🎵 Now Playing: ${nowPlaying}
📊 Server Load: ${serverLoad}
🌍 Language: ${lang}
`;

    return message.reply(text);
  }
};
