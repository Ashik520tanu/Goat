module.exports.config = {
  name: "tag2",
  version: "1.0",
  hasPermission: 0,
  credits: "ChatGPT",
  description: "Mention everyone using @everyone",
  commandCategory: "group",
  usages: "tag2 everyone",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  if (args[0] !== "everyone") {
    return api.sendMessage("❗ ব্যবহার:\n/tag2 everyone", event.threadID);
  }

  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const mentions = [];

    threadInfo.participantIDs.forEach(id => {
      if (id !== api.getCurrentUserID()) {
        mentions.push({
          tag: "@everyone",
          id: id
        });
      }
    });

    return api.sendMessage({
      body: "@everyone",
      mentions
    }, event.threadID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ট্যাগ করতে সমস্যা হয়েছে!", event.threadID);
  }
};
