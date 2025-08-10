const fs = require("fs");
const filePath = __dirname + "/restrictedGroups.json";

let restrictedGroups = [];

// Load saved restricted groups from file
if (fs.existsSync(filePath)) {
  restrictedGroups = JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveRestrictedGroups() {
  fs.writeFileSync(filePath, JSON.stringify(restrictedGroups, null, 2));
}

module.exports.config = {
  name: "grp",
  version: "1.0.1",
  hasPermssion: 1,
  credits: "ChatGPT Fixed",
  description: "Turn off/on group messages for non-admins",
  commandCategory: "group",
  usages: "/grp off | /grp on",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args[0] === "off") {
    if (!restrictedGroups.includes(threadID)) {
      restrictedGroups.push(threadID);
      saveRestrictedGroups();
    }
    return api.sendMessage(
      "🚫 Group is now OFF. Non-admins will be removed if they send any message!",
      threadID,
      messageID
    );
  }

  if (args[0] === "on") {
    restrictedGroups = restrictedGroups.filter(id => id !== threadID);
    saveRestrictedGroups();
    return api.sendMessage(
      "✅ Group is now ON. Everyone can talk freely.",
      threadID,
      messageID
    );
  }

  return api.sendMessage("⚠️ Use: /grp off | /grp on", threadID, messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, senderID } = event;

  // Group check: threadID length > 15
  if (String(threadID).length < 15) return;
  if (!restrictedGroups.includes(threadID)) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const senderIsAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);
    const botIsAdmin = threadInfo.adminIDs.some(admin => admin.id === api.getCurrentUserID());

    if (!senderIsAdmin && botIsAdmin) {
      await api.removeUserFromGroup(senderID, threadID);
    }
  } catch (e) {
    console.log("❌ Error removing user:", e.message);
  }
};
