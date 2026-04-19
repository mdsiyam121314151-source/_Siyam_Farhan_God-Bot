const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
config: {
name: "config",
version: "1.1.0",
author: "亗𝐃𝐒 乂𝐒𝐈𝐘𝐀𝐌亗 | 亗 SIYAM HASAN 亗",
countDown: 5,
role: 3, // Operator Only
description: "Bot account configuration and management",
category: "operator",
guide: "{pn}"
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🔐 [ FILE CREATOR INFORMATION-NIJHUM BOT ]
 * 👤 OWNER    : SIYAM HASAN
 * 🆔 UID      : 61568411310748
 * 🔗 FACEBOOK : https://facebook.com/61568411310748
 * 📞 WHATSAPP : +880 1789138154
 * 📍 LOCATION : KISHOREGANJ, BANGLADESH
 * 🛠️ PROJECT  : SIYAM BOT PROJECT (2026)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
onStart: async function ({ api, event }) {
const { threadID, messageID, senderID } = event;

const msg = "｟BOT CONFIGURATION MENU｠\n"
+ "\n01. Edit Bio"
+ "\n02. Edit Nickname"
+ "\n03. Pending Messages"
+ "\n04. Unread Messages"
+ "\n05. Spam Messages"
+ "\n06. Change Avatar"
+ "\n07. Avatar Shield (on/off)"
+ "\n08. Block User"
+ "\n09. Unblock User"
+ "\n10. Create Post"
+ "\n11. Delete Post"
+ "\n12. Comment Post (User)"
+ "\n13. Comment Post (Group)"
+ "\n14. Drop Feelings"
+ "\n15. Add Friend"
+ "\n16. Accept Friend Request"
+ "\n17. Decline Friend Request"
+ "\n18. Unfriend UID"
+ "\n19. Send Message via UID"
+ "\n20. Note Code (buildtool.dev)"
+ "\n21. Logout Account"
+ "\n\nReply to this message with a number to choose.";

return api.sendMessage(msg, threadID, (err, info) => {
global.GoatBot.onReply.set(info.messageID, {
commandName: this.config.name,
messageID: info.messageID,
author: senderID,
type: "menu"
});
}, messageID);
},

onReply: async function ({ api, event, Reply, args }) {
const { threadID, messageID, senderID, body } = event;
const { type, author, isGroup } = Reply;
const botID = api.getCurrentUserID();

if (senderID != author) return;

const reply = (text, nextType, extraData = {}) => {
api.sendMessage(text, threadID, (err, info) => {
global.GoatBot.onReply.set(info.messageID, {
commandName: this.config.name,
messageID: info.messageID,
author: senderID,
type: nextType,
...extraData
});
}, messageID);
};

// --- MENU HANDLING ---
if (type == 'menu') {
const choice = body.trim();
if (['1', '01'].includes(choice)) reply("Reply with the BIO content or 'delete'", "changeBio");
else if (['2', '02'].includes(choice)) reply("Reply with the NICKNAME or 'delete'", "changeNickname");
else if (['3', '03'].includes(choice)) {
const pending = await api.getThreadList(50, null, ["PENDING"]);
let txt = pending.map(t => `Name: ${t.name}\nID: ${t.threadID}\nMsg: ${t.snippet}`).join("\n\n") || "No pending messages.";
return api.sendMessage("Pending List:\n" + txt, threadID);
}
else if (['6', '06'].includes(choice)) reply("Reply with an image/link to change avatar", "changeAvatar");
else if (['7', '07'].includes(choice)) {
// Logic for Shield handled here if needed or separate reply
return api.sendMessage("Usage: Use 'config 7 on' or 'off' directly (Not implemented in menu reply)", threadID);
}
else if (['10'].includes(choice)) reply("Enter the content for your post", "createPost");
else if (['21'].includes(choice)) {
api.sendMessage("Logging out...", threadID, () => api.logout());
}
// Add other menu logic here as per your Mirai code
}

// --- BIO CHANGE ---
else if (type == 'changeBio') {
const bio = body.toLowerCase() == 'delete' ? '' : body;
api.changeBio(bio, false, (err) => {
if (err) return api.sendMessage("Error changing bio.", threadID);
return api.sendMessage(`Bio ${!bio ? "deleted" : "updated to: " + bio} successfully.`, threadID);
});
}

// --- CREATE POST ---
else if (type == 'createPost') {
const session_id = getGUID();
const form = {
av: botID,
fb_api_req_friendly_name: "ComposerStoryCreateMutation",
fb_api_caller_class: "RelayModern",
doc_id: "4612917415497545",
variables: JSON.stringify({
input: {
composer_entry_point: "inline_composer",
composer_source_surface: "timeline",
idempotence_token: session_id + "_FEED",
source: "WWW",
attachments: [],
audience: { privacy: { base_state: "EVERYONE" } },
message: { text: body },
actor_id: botID,
client_mutation_id: "1"
}
})
};
api.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
if (e) return api.sendMessage("Post failed.", threadID);
const data = JSON.parse(i);
return api.sendMessage(`Post created!\nLink: ${data.data.story_create.story.url}`, threadID);
});
}

// --- AVATAR CHANGE ---
else if (type == 'changeAvatar') {
let url = (event.attachments[0] && event.attachments[0].url) || body;
if (!url) return api.sendMessage("Please provide an image.", threadID);
try {
const stream = (await axios.get(url, { responseType: "stream" })).data;
api.changeAvatar(stream, "", (err) => {
if (err) return api.sendMessage("Avatar change failed.", threadID);
return api.sendMessage("Avatar updated!", threadID);
});
} catch (e) { api.sendMessage("Error fetching image.", threadID); }
}
}
}
