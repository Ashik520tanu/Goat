const fs = require("fs");

module.exports.config = {
  name: "grpoff",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "ChatGPT",
  description: "Turn off/on group messages for non-admins",
  commandCategory: "group",
  usages: "/grp off | /grp on",
  cooldowns: 5,
};

let restrictedGroups = [];

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args[0] === "off") {
    if (!restrictedGroups.includes(threadID)) restrictedGroups.push(threadID);
    return api.sendMessage("🚫 Group is now OFF. Non-admins will be removed if they send any message!", threadID, messageID);
  }

  if (args[0] === "on") {
    restrictedGroups = restrictedGroups.filter(id => id !== threadID);
    return api.sendMessage("✅ Group is now ON. Everyone can talk freely.", threadID, messageID);
  }

  return api.sendMessage("⚠️ Use: /grp off | /grp on", threadID, messageID);
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, senderID, isGroup } = event;
  if (!isGroup || !restrictedGroups.includes(threadID)) return;

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const senderIsAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

    if (!senderIsAdmin) {
      await api.removeUserFromGroup(senderID, threadID);
    }
  } catch (e) {
    console.log("❌ Error removing user:", e);
  }
};
