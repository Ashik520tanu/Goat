const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports.config = {
  name: "lyrics",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Ashik",
  description: "গানটির লিরিক্স খুঁজবে (অনলাইন+অফলাইন)",
  commandCategory: "utility",
  usages: "/lyrics [গানের নাম]",
  cooldowns: 3
};

const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "lyrics.json");

// Ensure data file exists with a sample entry
module.exports.onLoad = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(DATA_FILE)) {
    const sample = {
      "tumi robe nirobe": {
        title: "তুমি রবে নীরবে",
        author: "জলজ",
        lyrics: "তুমি রবে নীরবে হৃদয়ে মেঘের মতো..."
      }
    };
    fs.writeJsonSync(DATA_FILE, sample, { spaces: 2 });
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const query = args.join(" ").toLowerCase().trim();

  if (!query) {
    return api.sendMessage("❗ দয়া করে গানের নাম লিখুন:\n\n📌 উদাহরণ: /lyrics তুমি রবে নীরবে", threadID, messageID);
  }

  // First try online fetch
  try {
    const res = await axios.get(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(query)}`);
    const d = res.data;
    if (d && d.lyrics) {
      // Save to local DB
      const db = fs.readJsonSync(DATA_FILE);
      db[query] = { title: d.title, author: d.author, lyrics: d.lyrics };
      fs.writeJsonSync(DATA_FILE, db, { spaces: 2 });

      // Prepare message (limit to 3000 chars)
      const text = d.lyrics.length > 3000
        ? d.lyrics.slice(0, 3000) + "\n\n📌 সম্পূর্ণ লিরিক্স বড়, ওভারফ্লো কাটানো হলো।"
        : d.lyrics;

      return api.sendMessage(
        `🎵 গান: ${d.title}\n👤 গায়ক: ${d.author}\n\n📝 লিরিক্স:\n${text}`,
        threadID, messageID
      );
    }
  } catch (e) {
    // ignore and fallback to local
  }

  // Fallback: search in local DB
  const db = fs.readJsonSync(DATA_FILE);
  if (db[query]) {
    const { title, author, lyrics } = db[query];
    const text = lyrics.length > 3000
      ? lyrics.slice(0, 3000) + "\n\n📌 সম্পূর্ণ লিরিক্স বড়, কাটানো হয়েছে।"
      : lyrics;
    return api.sendMessage(
      `📌 (offline) গান: ${title}\n👤 গায়ক: ${author}\n\n📝 লিরিক্স:\n${text}`,
      threadID, messageID
    );
  }

  return api.sendMessage(`❌ অনলাইনে ও অফলাইনে “${query}” গানটি পাওয়া যায়নি।`, threadID, messageID);
};
