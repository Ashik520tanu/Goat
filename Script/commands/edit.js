const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");

module.exports.config = {
  name: "edit",
  version: "1.1",
  hasPermission: 2,
  credits: "ashuu dont chng credit",
  description: "ছবির উপর ফ্রি প্রম্পট-এডিট (লোকাল)",
  commandCategory: "image",
  usages: "reply image + edit <prompt>",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ").toLowerCase();

  if (!event.messageReply || event.messageReply.attachments.length === 0)
    return api.sendMessage("❌ আগে কোনো ছবিতে রিপ্লাই দিয়ে `/edit sunglasses` এর মতো কিছু লেখো!", event.threadID, event.messageID);

  const attachment = event.messageReply.attachments[0];
  if (attachment.type !== "photo")
    return api.sendMessage("❌ শুধু ছবিতে রিপ্লাই করে এই কমান্ড কাজ করবে!", event.threadID, event.messageID);

  const imgUrl = attachment.url;
  const uid = event.senderID;
  const inputPath = path.join(__dirname, "cache", `input_${uid}.jpg`);
  const outputPath = path.join(__dirname, "cache", `output_${uid}.jpg`);

  try {
    // ডাউনলোড
    const res = await axios.get(imgUrl, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(inputPath));
    fs.writeFileSync(inputPath, Buffer.from(res.data, "binary"));

    let image = await Jimp.read(inputPath);

    // প্রম্পট অনুযায়ী effect
    switch (true) {
      case prompt.includes("blur"):
        image.blur(5);
        break;
      case prompt.includes("bright"):
        image.brightness(0.3);
        break;
      case prompt.includes("dark"):
        image.brightness(-0.3);
        break;
      case prompt.includes("bw") || prompt.includes("black white"):
        image.grayscale();
        break;
      case prompt.includes("invert"):
        image.invert();
        break;
      case prompt.includes("sunglasses"):
        image.print(await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE), 10, 10, "😎");
        break;
      default:
        image.print(await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE), 10, image.getHeight() - 40, `Edit: ${prompt}`);
    }

    await image.writeAsync(outputPath);

    // সেন্ড
    api.sendMessage(
      {
        body: `✅ Applied edit: ${prompt}`,
        attachment: fs.createReadStream(outputPath)
      },
      event.threadID,
      () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      },
      event.messageID
    );
  } catch (err) {
    console.error(err);
    api.sendMessage("❌ ছবিতে এডিট করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
