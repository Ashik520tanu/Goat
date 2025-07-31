const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");

module.exports.config = {
  name: "edit",
  version: "1.3",
  hasPermission: 0,
  credits: "Ashuu x ChatGPT",
  description: "Reply করা ছবিতে ফ্রি প্রম্পট-এডিট",
  commandCategory: "image",
  usages: "reply + edit <prompt>",
  cooldowns: 5
};

const removeBgApiKey = "YOUR_API_KEY"; // চাইলে এখানে API বসাও

module.exports.run = async function ({ api, event, args }) {
  const prompt = args.join(" ").toLowerCase();
  if (!event.messageReply || event.messageReply.attachments.length === 0)
    return api.sendMessage("📸 ছবিতে reply দিয়ে `/edit <prompt>` দাও!", event.threadID, event.messageID);

  const attachment = event.messageReply.attachments[0];
  if (attachment.type !== "photo")
    return api.sendMessage("❌ শুধু ছবিতে reply দিয়ে `/edit` দাও!", event.threadID, event.messageID);

  const url = attachment.url;
  const uid = event.senderID;
  const inputPath = path.join(__dirname, "cache", `input_${uid}.jpg`);
  const outputPath = path.join(__dirname, "cache", `output_${uid}.png`);

  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    fs.ensureDirSync(path.dirname(inputPath));
    fs.writeFileSync(inputPath, Buffer.from(res.data, "binary"));

    let image = await Jimp.read(inputPath);

    switch (true) {
      case prompt.includes("adjust"):
        image.brightness(0.1).contrast(0.15);
        break;
      case prompt.includes("blur"):
        image.blur(3);
        break;
      case prompt.includes("bw") || prompt.includes("black white"):
        image.grayscale();
        break;
      case prompt.includes("invert"):
        image.invert();
        break;
      case prompt.includes("cartoon"):
        image.posterize(6).contrast(0.3);
        break;
      case prompt.includes("dark"):
        image.brightness(-0.3);
        break;
      case prompt.includes("bright"):
        image.brightness(0.3);
        break;
      case prompt.includes("bgremove"):
        if (!removeBgApiKey || removeBgApiKey === "YOUR_API_KEY")
          return api.sendMessage("❌ bgremove চালাতে API key লাগবে!", event.threadID, event.messageID);
        const form = new FormData();
        form.append("image_file", fs.createReadStream(inputPath));
        form.append("size", "auto");

        const removeRes = await axios.post("https://api.remove.bg/v1.0/removebg", form, {
          responseType: "arraybuffer",
          headers: {
            ...form.getHeaders(),
            "X-Api-Key": removeBgApiKey
          }
        });

        fs.writeFileSync(outputPath, removeRes.data);
        return api.sendMessage({
          body: `✅ Edit Applied: ${prompt}`,
          attachment: fs.createReadStream(outputPath)
        }, event.threadID, () => {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        }, event.messageID);
      default:
        image.print(await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE), 10, image.getHeight() - 40, `Edit: ${prompt}`);
    }

    await image.writeAsync(outputPath);

    api.sendMessage({
      body: `✅ Edit Applied: ${prompt}`,
      attachment: fs.createReadStream(outputPath)
    }, event.threadID, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    }, event.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ এডিট করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
  }
};
