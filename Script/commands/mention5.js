module.exports.config = {
  name: "onMentionByUser",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ChatGPT",
  description: "যদি নির্দিষ্ট ইউজার কাউকে মেনশন করে তখন রেসপন্স দেয়",
  commandCategory: "system",
  usages: "auto trigger",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const authorUID = "61573008832911"; // এই UID যদি কাউকে মেনশন করে

  // যদি মেনশন না থাকে বা মেসেজ লেখক টার্গেট ইউজার না হয়
  if (!event.mentions || event.senderID !== authorUID) return;

  const replies = [
    "⚠️ বস এখন একটু বিজি আছেন!",
    "🚫 উনি এই মুহূর্তে পাওয়া যাবে না।",
    "😴 ঘুমে আছেন মনে হয়, পরে আওয়াজ দিয়েন।",
    "📵 ফোন সাইলেন্টে, পরে দেখা যাবে!",
    "🤖 বস এখন AFK! আবার মেনশন দিয়েন কিছুক্ষণ পর!"
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  return api.sendMessage(randomReply, event.threadID, event.messageID);
};

module.exports.run = () => {};
