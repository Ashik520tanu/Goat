const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "2.1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Generate 2 images from Pallinations API: one exact and one related",
  commandCategory: "image",
  usages: "/make [prompt]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const prompt = args.join(" ");
  if (!prompt)
    return api.sendMessage("❌ অনুগ্রহ করে একটি প্রম্পট দিন যেমন:\n/make cute cat", event.threadID, event.messageID);

  const wait = await api.sendMessage("🔄 ছবি বানানো হচ্ছে, একটু অপেক্ষা করো...", event.threadID, event.messageID);

  try {
    const path1 = __dirname + `/cache/${event.senderID}_img1.jpg`;
    const path2 = __dirname + `/cache/${event.senderID}_img2.jpg`;

    // প্রথম ছবি: আসল প্রম্পট
    const url1 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    const res1 = await axios.get(url1, { responseType: "arraybuffer" });
    fs.writeFileSync(path1, Buffer.from(res1.data, "binary"));

    // দ্বিতীয় ছবি: ভিন্ন কিন্তু সম্পর্কিত
    const altPrompt = `${prompt}, trending art, illustration`;
    const url2 = `https://image.pollinations.ai/prompt/${encodeURIComponent(altPrompt)}`;
    const res2 = await axios.get(url2, { responseType: "arraybuffer" });
    fs.writeFileSync(path2, Buffer.from(res2.data, "binary"));

    // পাঠানো হচ্ছে
    await api.sendMessage({
      body: `✅ ছবি তৈরি হয়েছে!`,
      attachment: [
        fs.createReadStream(path1),
        fs.createReadStream(path2)
      ]
    }, event.threadID, () => {
      fs.unlinkSync(path1);
      fs.unlinkSync(path2);
    }, event.messageID);

  } catch (err) {
    console.error("❌ ছবি বানানোর সময় error:", err);
    api.sendMessage("❌ দুঃখিত, ছবি তৈরি করতে ব্যর্থ হয়েছে!", event.threadID, event.messageID);
  }
};
