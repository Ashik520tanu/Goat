const axios = require("axios");

module.exports.config = {
  name: "imgur2",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Islamick Cyber Chat + Modified by Priyo",
  description: "একাধিক ছবি Imgur-এ আপলোড করুন",
  commandCategory: "utility",
  usages: "[reply or attach images]",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  try {
    const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json');
    const imgurApi = apis.data.imgur;

    const attachments = event.messageReply?.attachments || event.attachments;

    if (!attachments || attachments.length === 0) {
      return api.sendMessage(
        "📸 অনুগ্রহ করে একটি বা একাধিক ছবি রিপ্লাই দিন অথবা অ্যাটাচ করুন।",
        event.threadID,
        event.messageID
      );
    }

    const results = [];

    for (const item of attachments) {
      try {
        const response = await axios.get(`${imgurApi}/imgur?link=${encodeURIComponent(item.url)}`);
        const link = response.data.uploaded.image;
        results.push(`✅ ${link}`);
      } catch (err) {
        results.push(`❌ আপলোড ব্যর্থ: ${item.url}`);
      }
    }

    return api.sendMessage(
      `🌐 ইমগুর লিংকসমূহ:\n\n${results.join("\n\n")}`,
      event.threadID,
      event.messageID
    );
  } catch (error) {
    console.error(error);
    return api.sendMessage("❌ ইমগুর সার্ভারে সমস্যা হচ্ছে বা API ডাউন। পরে আবার চেষ্টা করুন।", event.threadID, event.messageID);
  }
};
