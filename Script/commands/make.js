const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "make",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Generate images using Craiyon AI",
  commandCategory: "ai",
  usages: "[prompt]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("📌 উদাহরণ:\n/make একটি সুন্দর বাংলার দৃশ্য", event.threadID, event.messageID);

  const waitMsg = await api.sendMessage("🧠 কল্পনা করা হচ্ছে... দয়া করে অপেক্ষা করুন ⏳", event.threadID);

  try {
    const response = await axios.post("https://backend.craiyon.com/generate", { prompt });

    const images = response.data.images;
    const attachments = [];

    for (let i = 0; i < images.length; i++) {
      const imageBuffer = Buffer.from(images[i], 'base64');
      const filePath = path.join(__dirname, `cache`, `craiyon_${i}.png`);
      fs.writeFileSync(filePath, imageBuffer);
      attachments.push(fs.createReadStream(filePath));
    }

    await api.unsendMessage(waitMsg.messageID);
    api.sendMessage({
      body: `🎨 কল্পনার উপর ভিত্তি করে তৈরি করা হলো:\n"${prompt}"`,
      attachment: attachments
    }, event.threadID, () => {
      // Clear cache after sending
      images.forEach((_, i) => {
        const filePath = path.join(__dirname, `cache`, `craiyon_${i}.png`);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }, event.messageID);
    
  } catch (err) {
    console.error(err);
    await api.unsendMessage(waitMsg.messageID);
    return api.sendMessage("❌ ছবি তৈরিতে ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।", event.threadID, event.messageID);
  }
};
