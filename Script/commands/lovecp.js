const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "lovecp",
  version: "1.0",
  hasPermission: 0,
  credits: "ChatGPT & Ashik",
  description: "Create a romantic couple cover with mentioned user",
  commandCategory: "image",
  usages: "@mention",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const mention = Object.keys(event.mentions)[0];
  const senderID = event.senderID;

  if (!mention) {
    return api.sendMessage("❗ কারো নাম মেনশন করো।", event.threadID);
  }

  const coverList = [
    "https://i.imgur.com/UGTPazU.jpg",
    "https://i.imgur.com/ZgkHHsS.jpg",
    "https://i.imgur.com/KVQU7Em.jpg",
    "https://i.imgur.com/pUK6o7O.jpg",
    "https://i.imgur.com/yedKgNn.jpg",
    "https://i.imgur.com/oOXTCjc.jpg",
    "https://i.imgur.com/ftVZpUC.jpg",
    "https://i.imgur.com/D2HqfXl.jpg"
  ];

  const coverURL = coverList[Math.floor(Math.random() * coverList.length)];
  const avatarURL1 = `https://graph.facebook.com/${senderID}/picture?width=512&height=512`;
  const avatarURL2 = `https://graph.facebook.com/${mention}/picture?width=512&height=512`;

  const cache = path.join(__dirname, "cache");
  fs.ensureDirSync(cache);

  const p1 = `${cache}/avt_${senderID}.jpg`;
  const p2 = `${cache}/avt_${mention}.jpg`;
  const output = `${cache}/love_${Date.now()}.jpg`;

  try {
    const [bg, av1, av2] = await Promise.all([
      jimp.read(await (await axios.get(coverURL, { responseType: 'arraybuffer' })).data),
      jimp.read(await (await axios.get(avatarURL1, { responseType: 'arraybuffer' })).data),
      jimp.read(await (await axios.get(avatarURL2, { responseType: 'arraybuffer' })).data)
    ]);

    av1.circle().resize(170, 170);
    av2.circle().resize(170, 170);

    bg.resize(851, 315)
      .composite(av1, 100, 100)  // sender
      .composite(av2, 580, 100); // mentioned

    await bg.writeAsync(output);

    return api.sendMessage({
      body: "❤️ তোমাদের জন্য সুন্দর কভার প্রস্তুত!",
      attachment: fs.createReadStream(output)
    }, event.threadID, () => {
      fs.unlinkSync(output);
    });

  } catch (e) {
    console.error("Error:", e);
    return api.sendMessage("❌ কিছু একটা ভুল হয়েছে কভার তৈরিতে!", event.threadID);
  }
};
