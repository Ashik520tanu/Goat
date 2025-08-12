const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "4k",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "ashik",
    description: "Enhance image using free AI Super-Resolution",
    commandCategory: "Image Editing Tools",
    usages: "Reply to an image or provide image URL",
    cooldowns: 5
  },

  run: async function({ api, event, args }) {
    const tmpPath = __dirname + "/cache/enhanced.jpg";
    const { threadID, messageID } = event;
    const imageUrl = event.messageReply
      ? event.messageReply.attachments[0].url
      : args.join(" ");

    if (!imageUrl) {
      return api.sendMessage("Please reply to an image or provide an image URL.", threadID, messageID);
    }

    const loading = await api.sendMessage("⏳ Processing your image, please wait...", threadID, messageID);

    try {
      // Using DeepAI's Super Resolution API
      const response = await axios.post("https://api.deepai.org/api/torch-srgan", { image: imageUrl }, {
        headers: { "Api-Key": "quickstart-QUdJIGlzIGNvbWluZy4uLi4K" } // free demo key
      });

      const enhancedUrl = response.data.output_url;
      if (!enhancedUrl) throw new Error("No enhanced image returned.");

      const imgRes = await axios.get(enhancedUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(tmpPath, Buffer.from(imgRes.data, "binary"));

      await api.sendMessage(
        { body: "✅ Image enhanced successfully!", attachment: fs.createReadStream(tmpPath) },
        threadID,
        () => fs.unlinkSync(tmpPath),
        messageID
      );
      api.unsendMessage(loading.messageID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ Failed to enhance the image. Please try again later.", threadID, messageID);
    }
  }
};
