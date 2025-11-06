module.exports.config = {
  name: "test",
  version: "1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "বট sendMessage কাজ করছে কিনা টেস্ট করা হবে",
  commandCategory: "test",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  try {
    console.log("👉 Command triggered by:", event.senderID);
    await api.sendMessage("✅ বট তোমার মেসেজ ধরেছে এবং sendMessage চালানোর চেষ্টা করছে...", event.threadID, event.messageID);
    console.log("✅ Message sent successfully!");
  } catch (err) {
    console.error("❌ sendMessage error:", err);
    api.sendMessage("⚠️ Error: " + err.message, event.threadID);
  }
};
