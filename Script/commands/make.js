const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "2.0.0",
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
    // প্রথম ছবি: আসল প্রম্পট
    const url1 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    const path1 = __dirname + `/cache/${event.senderID}_img1.jpg`;
    const res1 = await axios.get(url1, { responseType: "stream" });
    res1.data.pipe(fs.createWriteStream(path1));

    // দ্বিতীয় ছবি: একই ক্যাটাগরির জন্য এক্সট্রা শব্দ
    const altPrompt = `${prompt}, trending style, concept art`;
    const url2 = `https://image.pollinations.ai/prompt/${encodeURIComponent(altPrompt)}`;
    const path2 = __dirname + `/cache/${event.senderID}_img2.jpg`;
    const res2 = await axios.get(url2, { responseType: "stream" });
    res2.data.pipe(fs.createWriteStream(path2));

    // যখন দুইটাই ডাউনলোড শেষ হবে
    res1.data.on("end", () => {
      res2.data.on("end", async () => {
        await api.sendMessage({
          body: `🖼️ আপনার প্রম্পট অনুযায়ী ২টি ছবি তৈরি হয়েছে!`,
          attachment: [
            fs.createReadStream(path1),
            fs.createReadStream(path2)
          ]
        }, event.threadID, () => {
          fs.unlinkSync(path1);
          fs.unlinkSync(path2);
        }, event.messageID);
      });
    });

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ দুঃখিত, ছবি তৈরি করতে ব্যর্থ হয়েছে!", event.threadID, event.messageID);
  }
};
