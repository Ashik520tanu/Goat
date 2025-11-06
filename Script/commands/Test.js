module.exports.config = {
  name: "test",
  version: "1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "টেস্ট করে দেখা হবে বট মেসেজ ধরছে কিনা",
  commandCategory: "test",
  usages: "",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event }) {
  api.sendMessage("✅ বট তোমার মেসেজ ধরছে!", event.threadID, event.messageID);
};
