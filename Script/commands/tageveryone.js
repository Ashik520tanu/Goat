module.exports.config = {
  name: "tag2",
  version: "1.0",
  hasPermission: 2,
  credits: "ashik",
  description: "Mention everyone multiple times using @everyone",
  commandCategory: "group",
  usages: "/tag2 @everyone <amount> অথবা /tag3 everyone <amount>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  if (!args[0] || !args[1] || (args[0] !== "@everyone" && args[0].toLowerCase() !== "everyone")) {
    return api.sendMessage("❗ ব্যবহার:\n/tag3 @everyone <বার> অথবা /tag3 everyone <বার>", event.threadID, event.messageID);
  }

  const amount = parseInt(args[1]);
  if (isNaN(amount) || amount <= 0) {
    return api.sendMessage("❌ সঠিক সংখ্যা দিন।", event.threadID, event.messageID);
  }

  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const mentions = threadInfo.participantIDs
      .filter(id => id !== api.getCurrentUserID())
      .map(id => ({ tag: "@everyone", id }));

    for (let i = 0; i < amount; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // প্রতি মেসেজের মাঝে 0.5 সেকেন্ড delay
      api.sendMessage({ body: "@everyone", mentions }, event.threadID);
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ট্যাগ করতে সমস্যা হয়েছে!", event.threadID);
  }
};
