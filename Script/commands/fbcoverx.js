const fs = require("fs-extra");
const axios = require("axios");
const Jimp = require("jimp");
const path = require("path");

module.exports.config = {
  name: "fbcoverx",
  version: "1.2",
  hasPermission: 0,
  credits: "Ashuu x ChatGPT",
  description: "Make FB cover photo with your name and profile pic",
  commandCategory: "image",
  usages: "/fbcoverx v4-v15 yourname",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const version = args[0];
  const name = args.slice(1).join(" ");
  const uid = event.senderID;

  if (!version || !name)
    return api.sendMessage("⚠️ ব্যবহার করুন: /fbcoverx v4 ashik", event.threadID, event.messageID);

  const bgLinks = {
    v4: "https://i.imgur.com/pAqCNbG.jpg",
    v5: "https://i.imgur.com/WZNdPtk.jpg",
    v6: "https://i.imgur.com/tNwhC5U.jpg",
    v7: "https://i.imgur.com/OoPkKDt.jpg",
    v8: "https://i.imgur.com/RzHSCzR.jpg",
    v9: "https://i.imgur.com/j1TOHwn.jpg",
    v10: "https://i.imgur.com/4JLZcRL.jpg",
    v11: "https://i.imgur.com/FEVKgKM.jpg",
    v12: "https://i.imgur.com/lK0z0x2.jpg",
    v13: "https://i.imgur.com/vH9gth7.jpg",
    v14: "https://i.imgur.com/MzLbVPJ.jpg",
    v15: "https://i.imgur.com/EyReuDj.jpg"
  };

  const bgURL = bgLinks[version.toLowerCase()];
  if (!bgURL) return api.sendMessage("❌ `v4` থেকে `v15` পর্যন্ত দিন", event.threadID, event.messageID);

  const avatarURL = `https://graph.facebook.com/${uid}/picture?width=512&height=512`;
  const cache = path.join(__dirname, "cache");
  const avatarPath = `${cache}/avatar_${uid}.jpg`;
  const outputPath = `${cache}/cover_${uid}.jpg`;

  try {
    fs.ensureDirSync(cache);

    const [bgData, avatarData] = await Promise.all([
      axios.get(bgURL, { responseType: "arraybuffer" }),
      axios.get(avatarURL, { responseType: "arraybuffer" })
    ]);

    fs.writeFileSync(avatarPath, Buffer.from(avatarData.data, "binary"));

    const bg = await Jimp.read(bgData.data);
    const avatar = await Jimp.read(avatarPath);
    avatar.circle().resize(160, 160);

    bg.resize(851, 315).composite(avatar, 40, 80);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    bg.print(font, 230, 120, `✨ ${name.toUpperCase()} ✨`);

    await bg.writeAsync(outputPath);

    return api.sendMessage({
      body: "✅ কভারফটো তৈরি হয়েছে!",
      attachment: fs.createReadStream(outputPath)
    }, event.threadID, () => {
      fs.unlinkSync(avatarPath);
      fs.unlinkSync(outputPath);
    }, event.messageID);

  } catch (err) {
    console.log("⛔ ERROR:", err);
    return api.sendMessage("❌ কভার তৈরি করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
