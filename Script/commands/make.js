const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "yourName",
  description: "Generate an image from prompt using AI",
  commandCategory: "image",
  usages: "/make [prompt]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("🖌️ | দয়া করে একটি প্রম্পট দিন\n\nউদাহরণ: /make a cat sitting on moon", event.threadID, event.messageID);

  const waitMsg = await api.sendMessage(`🎨 | “${prompt}” এর উপর ভিত্তি করে ছবি তৈরি হচ্ছে... একটু অপেক্ষা করুন...`, event.threadID);

  try {
    const response = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
      responseType: "stream"
    });

    const path = __dirname + `/cache/make_${event.senderID}.jpg`;
    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `✅ | আপনার ছবিটি প্রস্তুত 🎉\n\nPrompt: ${prompt}`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), waitMsg.messageID);
    });

    writer.on("error", (err) => {
      console.error("❌ | Write error:", err);
      api.sendMessage("⛔ | ছবি ফাইল সেভ করতে ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।", event.threadID, waitMsg.messageID);
    });

  } catch (error) {
    console.error("⛔ | Image generate failed:", error.message || error);
    api.sendMessage("🚫 | ছবি জেনারেট করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।", event.threadID, waitMsg.messageID);
  }
};
