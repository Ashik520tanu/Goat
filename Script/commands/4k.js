const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "4k",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "ashik",
    description: "Enhance image using free Waifu2x AI Super-Resolution",
    commandCategory: "Image Editing Tools",
    usages: "Reply to an image or provide image URL",
    cooldowns: 5
  },

  run: async function({ api, event, args }) {
    const tmpFile = __dirname + "/cache/enhanced.png";
    const { threadID, messageID } = event;
    const imageUrl = event.messageReply
      ? event.messageReply.attachments[0].url
      : args.join(" ");

    if (!imageUrl) {
      return api.sendMessage("Please reply to an image or provide a valid image URL.", threadID, messageID);
    }

    const loadingMsg = await api.sendMessage("⏳ Processing your image, please wait...", threadID, messageID);

    try {
      // waifu2x free API: upscale by 2x and denoise level 1
      // ফ্রি এবং পপুলার Waifu2x API ইউজ করছি
      const apiUrl = `https://api.deepai.org/api/waifu2x`;

      const response = await axios.post(apiUrl, {
        image: imageUrl
      }, {
        headers: { "Api-Key": "quickstart-QUdJIGlzIGNvbWluZy4uLi4K" }
      });

      const enhancedUrl = response.data.output_url;
      if (!enhancedUrl) throw new Error("No enhanced image URL received.");

      const imgRes = await axios.get(enhancedUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(tmpFile, Buffer.from(imgRes.data, "binary"));

      await api.sendMessage({
        body: "✅ Image enhanced successfully!",
        attachment: fs.createReadStream(tmpFile)
      }, threadID, () => fs.unlinkSync(tmpFile), messageID);

      api.unsendMessage(loadingMsg.messageID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ Failed to enhance the image. Please try again later.", threadID, messageID);
    }
  }
};
