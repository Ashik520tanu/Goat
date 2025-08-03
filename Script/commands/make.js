const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Generate AI images from prompt",
  commandCategory: "ai",
  usages: "/make [prompt] | /make rules",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ");

  if (!prompt) {
    return api.sendMessage("📌 উদাহরণ: /make sad girl with rain", event.threadID, event.messageID);
  }

  if (prompt.toLowerCase() === "rules") {
    return api.sendMessage(
      `🎨 AI Image Categories:
• sad girl
• fantasy boy
• realistic girl
• anime boy
• horror face
• angry villain
• cute baby
• islamic style
• football player
• korean boy
\nযেকোনো একটি ক্যাটাগরি প্রম্পট হিসেবে ব্যবহার করো।`,
      event.threadID,
      event.messageID
    );
  }

  try {
    const waiting = await api.sendMessage("🔄 ছবি বানানো হচ্ছে, একটু অপেক্ষা করো...", event.threadID);

    // New free API
    const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
      responseType: "stream",
    });

    const path = __dirname + `/cache/make_${event.senderID}.jpg`;
    const writer = fs.createWriteStream(path);
    res.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: `✅ | তোমার প্রম্পট অনুযায়ী ছবি প্রস্তুত হয়েছে!`,
          attachment: fs.createReadStream(path),
        },
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    });

    writer.on("error", () => {
      api.sendMessage("❌ ছবি সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করো।", event.threadID, event.messageID);
    });
  } catch (e) {
    console.error(e);
    return api.sendMessage("❌ ছবি বানানো যায়নি। আবার চেষ্টা করো বা প্রম্পট চেঞ্জ করো।", event.threadID, event.messageID);
  }
};
