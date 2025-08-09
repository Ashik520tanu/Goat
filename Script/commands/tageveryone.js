module.exports.config = {
  name: "tag2",
  version: "1.1",
  hasPermission: 2,
  credits: "ashik",
  description: "Mention everyone multiple times using @everyone",
  commandCategory: "group",
  usages: "/tag2 everyone (amount)",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { ADMINBOT } = global.config;
  const senderID = event.senderID;

  // চেক করো এই ইউজার অ্যাডমিন কিনা
  if (!ADMINBOT.includes(senderID)) {
    return api.sendMessage("❌ এই কমান্ড শুধুমাত্র বট অ্যাডমিনদের জন্য!", event.threadID, event.messageID);
  }

  // Check if 'everyone' is mentioned and the amount is provided
  if (args.length < 2 || (args[0] !== "everyone" && args[0] !== "@everyone")) {
    return api.sendMessage("❗ ব্যবহার:\n/tag2 everyone (amount)", event.threadID, event.messageID);
  }

  const amount = parseInt(args[1]);
  if (isNaN(amount) || amount <= 0) {
    return api.sendMessage("❌ এমাউন্ট সঠিকভাবে দাও (পজিটিভ নাম্বার)", event.threadID, event.messageID);
  }

  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const mentions = [];

    // Mention all participants except the bot itself
    threadInfo.participantIDs.forEach(id => {
      if (id !== api.getCurrentUserID()) {
        mentions.push({
          tag: "@everyone",
          id: id
        });
      }
    });

    // Send @everyone tag 'amount' times with a small delay
    for (let i = 0; i < amount; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay 0.5 seconds between messages
      await api.sendMessage({
        body: "@everyone",
        mentions
      }, event.threadID);
    }

    return api.sendMessage(`✅ ${amount} বার @everyone মেনশন করা হয়েছে!`, event.threadID, event.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ট্যাগ করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
