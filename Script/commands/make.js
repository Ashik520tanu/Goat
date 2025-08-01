const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ashik x ChatGPT",
  description: "Generate AI image from prompt",
  commandCategory: "AI-Image",
  usages: "/make [prompt]",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt)
    return api.sendMessage("🖼️ | দয়া করে একটি প্রম্পট দিন...\nউদাহরণ: /make a boy standing in rain", event.threadID, event.messageID);

  const msg = await api.sendMessage(`🎨 | "${prompt}" এর উপর ভিত্তি করে ছবি তৈরি হচ্ছে... একটু অপেক্ষা করুন...`, event.threadID);

  try {
    // API 1: Free Anime & Realistic generator
    const res = await axios.get(`https://ai-iamashik.onrender.com/generate?prompt=${encodeURIComponent(prompt)}`);
    
    if (!res.data || !res.data.url) {
      return api.sendMessage("❌ | ছবি তৈরি করতে ব্যর্থ হলাম। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }

    const imagePath = __dirname + `/cache/make_${event.senderID}.jpg`;
    const imgRes = await axios.get(res.data.url, { responseType: "arraybuffer" });
    fs.writeFileSync(imagePath, Buffer.from(imgRes.data, "utf-8"));

    return api.sendMessage({
      body: `✅ | "${prompt}" অনুযায়ী তৈরি করা হয়েছে 👇`,
      attachment: fs.createReadStream(imagePath)
    }, event.threadID, () => fs.unlinkSync(imagePath), event.messageID);

  } catch (e) {
    console.log(e);
    return api.sendMessage("🚫 | ছবি জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন বা পরে চেষ্টা করুন।", event.threadID, event.messageID);
  }
};
