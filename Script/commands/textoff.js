const fs = require("fs");

module.exports.config = {
  name: "textcontrol",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "ChatGPT",
  description: "Turn off/on text in group, auto remove non-admins who talk",
  commandCategory: "group",
  usages: "/text off | /text on",
  cooldowns: 5,
};

let restrictedGroups = [];

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args[0] === "off") {
    if (!restrictedGroups.includes(threadID)) restrictedGroups.push(threadID);
    return api.sendMessage("🚫 Group text is now *off*. Non-admins will be removed if they send any message!", threadID, messageID);
  }

  if (args[0] === "on") {
    restrictedGroups = restrictedGroups.filter(id => id !== threadID);
    return api.sendMessage("✅ Group text is now *on*. Members can talk freely again.", threadID, messageID);
  }

  return api.sendMessage("⚠️ Use: /text off | /text on", threadID, messageID);
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

module.exports.languages = {
  en: {
    on: "Group text is ON",
    off: "Group text is OFF"
  }
};
