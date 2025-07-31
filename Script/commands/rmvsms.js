module.exports.config = {
  name: "unsendOnReact",
  version: "1.0.0",
  hasPermission: 2,
  credits: "ChatGPT",
  description: "রিয়্যাকশন দিলে মেসেজ আনসেন্ট করে",
  commandCategory: "system",
  usages: "N/A",
  cooldowns: 0
};

// Mirai-এর handleReaction ফাংশন
module.exports.handleReaction = async function ({ api, event }) {
  const allowedReacts = ["❤", "👍", "🙀", "😿", "😾"];

  // যদি রিয়্যাকশন অনুমোদিত ইমোজি হয়
  if (allowedReacts.includes(event.reaction)) {
    try {
      await api.unsendMessage(event.messageID);
    } catch (err) {
      console.log("❌ আনসেন্ট করা যায়নি:", err);
    }
  }
};

module.exports.run = () => {};
