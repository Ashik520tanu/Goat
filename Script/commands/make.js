const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "1.0",
  hasPermssion: 0,
  credits: "ashuu dont chng credit",
  description: "Generate AI image from prompt (Anime & Realistic type)",
  commandCategory: "image",
  usages: "[prompt]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.onStart = async function({ api, event, args }) {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("❌ দয়া করে একটি প্রম্পট দিন! যেমন: /make anime girl", event.threadID, event.messageID);

  const uid = event.senderID;
  const type = Math.random() > 0.5 ? "anime" : "realistic";

  const loadingMsg = await api.sendMessage(`🧠 "${prompt}" থেকে ${type.toUpperCase()} ছবি বানানো হচ্ছে... অপেক্ষা করুন...`, event.threadID);

  try {
    const res = await axios.post("https://backend.craiyon.com/generate", { prompt: `${prompt} ${type} style` });

    if (!res.data || !res.data.images || res.data.images.length == 0) {
      return api.sendMessage("❌ ছবি জেনারেট করতে পারলাম না। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }

    const base64Image = res.data.images[0];
    const imageBuffer = Buffer.from(base64Image, "base64");
    const path = __dirname + `/cache/${uid}_make.png`;
    fs.writeFileSync(path, imageBuffer);

    api.unsendMessage(loadingMsg.messageID);
    api.sendMessage(
      {
        body: `✅ তোমার "${prompt}" প্রম্পট থেকে ${type.toUpperCase()} স্টাইল ছবি তৈরি হয়েছে।`,
        attachment: fs.createReadStream(path)
      },
      event.threadID,
      () => fs.unlinkSync(path),
      event.messageID
    );
  } catch (error) {
    api.unsendMessage(loadingMsg.messageID);
    api.sendMessage(`❌ ছবি তৈরি করতে সমস্যা হয়েছে:\n${error.message}`, event.threadID, event.messageID);
  }
};
