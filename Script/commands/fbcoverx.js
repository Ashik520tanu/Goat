const fs = require("fs-extra");
const axios = require("axios");
const Jimp = require("jimp");
const path = require("path");

module.exports.config = {
  name: "fbcoverx",
  version: "1.1",
  hasPermission: 0,
  credits: "Ashuu dont chng credit",
  description: "Generate stylish Facebook cover with name & profile",
  commandCategory: "image",
  usages: "/fbcoverx v4|v5|... <Your Name>",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const version = args[0];
  const name = args.slice(1).join(" ");
  const uid = event.senderID;

  if (!version || !name)
    return api.sendMessage("⚠️ Example: /fbcoverx v5 John Doe", event.threadID, event.messageID);

  const profilePicUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  const cachePath = path.join(__dirname, "cache");
  const avatarPath = `${cachePath}/avatar_${uid}.jpg`;
  const outputPath = `${cachePath}/fbcoverx_${uid}.jpg`;

  const backgrounds = {
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

  const bgURL = backgrounds[version.toLowerCase()];
  if (!bgURL)
    return api.sendMessage("❌ `v4` থেকে `v15` এর মধ্যে একটি ভার্সন দিন!", event.threadID, event.messageID);

  try {
    fs.ensureDirSync(cachePath);

    const [avatarRes, bgRes] = await Promise.all([
      axios.get(profilePicUrl, { responseType: "arraybuffer" }),
      axios.get(bgURL, { responseType: "arraybuffer" })
    ]);

    fs.writeFileSync(avatarPath, Buffer.from(avatarRes.data, "binary"));
    const bg = await Jimp.read(bgRes.data);
    const avatar = await Jimp.read(avatarPath);

    avatar.circle().resize(160, 160);
    bg.resize(851, 315);
    bg.composite(avatar, 40, 80);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const emoji = "✨🔥💖😎🎯";
    bg.print(font, 230, 120, `${name} ${emoji}`);

    await bg.writeAsync(outputPath);

    api.sendMessage({
      body: `✅ কভারফটো রেডি!\n\n𝐢𝐭'𝐳 𝐃𝐞𝐯𝐢𝐥 𝐛𝐨𝐭|ᵃˢʰⁱᵏ`,
      attachment: fs.createReadStream(outputPath)
    }, event.threadID, () => {
      fs.unlinkSync(avatarPath);
      fs.unlinkSync(outputPath);
    }, event.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ কভার তৈরি করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
