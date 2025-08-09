module.exports.config = {
  name: "afkMention",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ChatGPT",
  description: "যদি কেউ নির্দিষ্ট নাম মেনশন করে, তখন ব্যস্ততার মেসেজ দিবে",
  commandCategory: "system",
  usages: "auto",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const mentionedNames = Object.values(event.mentions || {});
  const targetName = "Mohammad Ashik".toLowerCase();

  const isMentioned = mentionedNames.some(name =>
    name.toLowerCase().includes(targetName)
  );

  if (!isMentioned) return;

  const replies = [
    "🤖 বস এখন AFK আছেন, পরে মেনশন দিয়েন।",
    "😴 উনি এখন ঘুমাচ্ছেন মনে হয়, একটু পর ট্রাই করো।",
    "📵 বস ফোন হাতেই নেয়নি, পরে পিং দিয়েন।",
    "😶 উনি এখন বিজি, কিছুক্ষণ পর ট্রাই করো।",
    "🚫 অনুগ্রহ করে একটু পর আবার মেনশন করো, উনি এখন unavailable।"
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];

  return api.sendMessage(reply, event.threadID, event.messageID);
};

module.exports.run = () => {};
