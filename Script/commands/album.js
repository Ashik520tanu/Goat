const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "album",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Ullash (modified by OpenAI)",
  description: "Send random video/photo by category",
  commandCategory: "media",
  usages: "[category]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  const allCategories = [
    "funny", "islamic", "sad", "anime", "cartoon", "love", "horny", "couple",
    "flower", "photo", "aesthetic", "sigma", "lyrics", "cat", "18plus",
    "freefire", "football", "girl", "friends", "cricket"
  ];

  const category = args[0]?.toLowerCase();

  // If no argument → show all categories to choose from
  if (!category) {
    const list = allCategories.map((cat, i) => `${i + 1}. ${cat}`).join("\n");
    return api.sendMessage(
      `🔹 Available Album Categories:\n\n${list}\n\n📌 Use /album [category] to get a media directly.`,
      threadID,
      messageID
    );
  }

  if (!allCategories.includes(category)) {
    return api.sendMessage(`❌ Invalid category: ${category}\n📌 Type /album to see valid ones.`, threadID, messageID);
  }

  // Optional: restrict adult content if needed
  const adult = ["horny", "18plus", "sex"];
  if (adult.includes(category) && event.senderID !== "100015168369582") {
    return api.sendMessage("🚫 You are not allowed to access this category.", threadID, messageID);
  }

  try {
    const apiUrl = `https://album-api-1ez5.onrender.com/album?type=${category}`;
    const res = await axios.get(apiUrl);

    if (!res.data || !res.data.data) {
      return api.sendMessage("⚠️ Couldn't fetch media. Try again later.", threadID, messageID);
    }

    const fileUrl = res.data.data;
    const fileExt = path.extname(fileUrl);
    const fileName = `album_${Date.now()}${fileExt}`;
    const filePath = path.join(__dirname, "cache", fileName);

    const fileData = await axios.get(fileUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, Buffer.from(fileData.data, "binary"));

    const msg = {
      body: `🎬 Here's your "${category}" media.`,
      attachment: fs.createReadStream(filePath),
    };

    api.sendMessage(msg, threadID, () => fs.unlinkSync(filePath), messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ Error fetching media. Please try again.", threadID, messageID);
  }
};
