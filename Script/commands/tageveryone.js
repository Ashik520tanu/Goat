module.exports.config = {
  name: "tag2",
  version: "1.1",
  hasPermssion: 2,
  credits: "ashik",
  description: "Mention everyone multiple times using @everyone",
  commandCategory: "group",
  usages: "/tag2 everyone (amount)",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const { ADMINBOT } = global.config;
  const senderID = event.senderID;

  // চেক করো এই ইউজার অ্যাডমিন কিনা
  if (!ADMINBOT.includes(senderID)) {
    return api.sendMessage("❌ এই কমান্ড শুধুমাত্র বট অ্যাডমিনদের জন্য!", event.threadID, event.messageID);
  }

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

    threadInfo.participantIDs.forEach(id => {
      if (id !== api.getCurrentUserID()) {
        mentions.push({
          tag: "@everyone",
          id: id
        });
      }
    });

    for (let i = 0; i < amount; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 সেকেন্ড বিরতি
      await api.sendMessage({
        body: "@everyone",
        mentions
      }, event.threadID);
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ট্যাগ করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};module.exports.config = {
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
