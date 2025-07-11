module.exports.config = {
  name: "dp8",
  version: "1.0.0",
  hasPermission: 0,
  credits: "RAJA ViP 5X",
  description: "Make a romantic image with tagged user",
  commandCategory: "media",
  usages: "",
  cooldowns: 5,
};

const fs = require("fs-extra");
const axios = require("axios");
const jimp = require("jimp");
const path = require("path");

module.exports.onLoad = async () => {
  const dir = path.resolve(__dirname, "cache", "canvas");
  const filePath = path.join(dir, "dk.png");

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) {
    const img = (await axios.get("https://i.imgur.com/scTij9q.jpg", { responseType: "arraybuffer" })).data;
    fs.writeFileSync(filePath, Buffer.from(img));
  }
};

async function circleImage(imagePath) {
  const image = await jimp.read(imagePath);
  image.resize(256, 256);
  
  
  const mask = new jimp(256, 256, 0x00000000);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const distance = Math.sqrt(Math.pow(x - 128, 2) + Math.pow(y - 128, 2));
      if (distance <= 128) {
        mask.setPixelColor(jimp.rgbaToInt(255, 255, 255, 255), x, y);
      }
    }
  }
  
  image.mask(mask, 0, 0);
  return image;
}

async function makeImage({ one, two }) {
  const dir = path.resolve(__dirname, "cache", "canvas");
  const background = await jimp.read(path.join(dir, "dk.png"));
  const outputPath = path.join(dir, `result_${one}_${two}.png`);
  const avatar1 = path.join(dir, `avt_${one}.png`);
  const avatar2 = path.join(dir, `avt_${two}.png`);

  const [get1, get2] = await Promise.all([
    axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' }),
    axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })
  ]);

  fs.writeFileSync(avatar1, Buffer.from(get1.data, 'utf-8'));
  fs.writeFileSync(avatar2, Buffer.from(get2.data, 'utf-8'));

  const circled1 = await circleImage(avatar1);
  const circled2 = await circleImage(avatar2);

  
  background.composite(circled1.resize(230, 230), 93, 122);
  background.composite(circled2.resize(230, 230), 513, 124);

  await background.writeAsync(outputPath);

  fs.unlinkSync(avatar1);
  fs.unlinkSync(avatar2);

  return outputPath;
}

module.exports.run = async function ({ event, api }) {
  const mention = Object.keys(event.mentions);
  const { senderID, threadID, messageID } = event;
  if (!mention[0]) return api.sendMessage("💏 ট্যাগ করতে হবে কার সাথে প্রেম করতে চান!", threadID, messageID);

  try {
    const imgPath = await makeImage({ one: senderID, two: mention[0] });
    return api.sendMessage({
      body: "︵💚🌸︵\n\n- এই শহরে আবেগ দ্বারা উপন্যাস লেখা হয় ভালোবাসা না-!!🖤🌸🐰",
      attachment: fs.createReadStream(imgPath)
    }, threadID, () => fs.unlinkSync(imgPath), messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("❌There was a problem creating the image, please try again.!", threadID, messageID);
  }
};
