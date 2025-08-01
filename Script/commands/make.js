const axios = require('axios');
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "make",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DarkMaker",
  description: "Generate AI image using prompt",
  commandCategory: "ai",
  usages: "/make [prompt]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("📌 দয়া করে একটি প্রম্পট দিন!\nযেমন: /make a girl sitting on moon", event.threadID, event.messageID);

  const msg = `🎨 | '${prompt}' এর উপর ভিত্তি করে ছবি তৈরি হচ্ছে... একটু অপেক্ষা করুন...`;
  api.sendMessage(msg, event.threadID, async (info) => {
    try {
      const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
        responseType: "stream"
      });

      const path = __dirname + `/cache/make-${event.senderID}.png`;
      const writer = fs.createWriteStream(path);

      res.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage({
          body: `✅ | "${prompt}" এর জন্য তৈরি ছবি:`,
          attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), info.messageID);
      });

      writer.on("error", () => {
        api.sendMessage("❌ | ছবি সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", event.threadID, info.messageID);
      });
    } catch (e) {
      console.error(e);
      api.sendMessage("❌ | ছবি জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন বা পরে চেষ্টা করুন।", event.threadID, event.messageID);
    }
  });
};
