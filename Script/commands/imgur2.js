const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "imgur2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "প্রিয়",
  description: "Imgur এ একসাথে অনেক ছবি আপলোড করুন",
  commandCategory: "utility",
  usages: "/imgur2 (reply many images)",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
    return api.sendMessage("⚠️ অনুগ্রহ করে এক বা একাধিক ছবির রিপ্লাই দিয়ে কমান্ড দিন।", event.threadID, event.messageID);
  }

  const attachments = event.messageReply.attachments.filter(item => item.type === "photo");
  if (attachments.length === 0) {
    return api.sendMessage("❌ শুধুমাত্র ছবিই আপলোড করা যাবে।", event.threadID, event.messageID);
  }

  api.sendMessage(`🕐 ${attachments.length} টি ছবি আপলোড হচ্ছে Imgur এ... দয়া করে অপেক্ষা করুন`, event.threadID);

  const imgurClientId = "2b12d36d4e6b6d2"; // তোমার দেওয়া লিংক থেকে নেওয়া client id
  let results = [];

  for (const img of attachments) {
    try {
      const imgPath = __dirname + `/cache/${img.filename}`;
      const imgData = (await axios.get(img.url, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(imgPath, Buffer.from(imgData, "binary"));

      const form = new FormData();
      form.append("image", fs.createReadStream(imgPath));

      const upload = await axios.post("https://api.imgur.com/3/image", form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Client-ID ${imgurClientId}`,
        },
      });

      if (upload.data && upload.data.data && upload.data.data.link) {
        results.push(upload.data.data.link);
      }

      fs.unlinkSync(imgPath); // Clean up
    } catch (e) {
      results.push("❌ একটি ছবি আপলোড হয়নি");
    }
  }

  api.sendMessage(`✅ আপলোড সম্পন্ন! লিংকগুলো নিচে দেওয়া হলো:\n\n${results.join("\n")}`, event.threadID);
};
