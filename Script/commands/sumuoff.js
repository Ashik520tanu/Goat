const fs = require("fs");
const path = __dirname + "/../data/sumu_group.json";

module.exports.config = {
  name: "sumu",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "তোমার নাম",
  description: "এই গ্রুপে বট রিপ্লাই অন/অফ করার সিস্টেম",
  commandCategory: "system",
  usages: "[on/off] [সময়]",
  cooldowns: 3
};

// অটো ফাইল তৈরি
module.exports.onLoad = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}, null, 2));
  }
};

// handleEvent: mute গ্রুপে বট কিছু বলবে না
module.exports.handleEvent = async ({ event }) => {
  const { threadID, body, senderID } = event;
  if (!body || senderID == global.botID) return;

  let data = JSON.parse(fs.readFileSync(path));
  let groupData = data[threadID];

  if (groupData && groupData.status === "off") {
    // অন করতে দিলে কাজ হোক
    if (body.toLowerCase().startsWith("/sumu on")) return;
    // বাকি সব কমান্ড কাজ না করুক
    return;
  }
};

// run: কমান্ড প্রসেস
module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const command = args[0];
  const timeText = args.slice(1).join(" ");

  let data = JSON.parse(fs.readFileSync(path));
  if (!data[threadID]) data[threadID] = { status: "on", until: null };

  if (command === "on") {
    data[threadID].status = "on";
    data[threadID].until = null;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage("✅ এই গ্রুপে বট এখন আবার কাজ করবে!", threadID, messageID);
  }

  if (command === "off") {
    if (!timeText) {
      data[threadID].status = "off";
      data[threadID].until = null;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
      return api.sendMessage("❌ এই গ্রুপে বট এখন চুপ থাকবে।", threadID, messageID);
    }

    let muteMs = convertTime(timeText);
    if (!muteMs) return api.sendMessage("⚠️ সময় ভুল ফরম্যাট। লিখো যেমন: 10 min / 2 hour / 1 day", threadID, messageID);

    data[threadID].status = "off";
    data[threadID].until = Date.now() + muteMs;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));

    setTimeout(() => {
      let updated = JSON.parse(fs.readFileSync(path));
      if (updated[threadID] && updated[threadID].until && Date.now() >= updated[threadID].until) {
        updated[threadID].status = "on";
        updated[threadID].until = null;
        fs.writeFileSync(path, JSON.stringify(updated, null, 2));
      }
    }, muteMs);

    return api.sendMessage(`⏳ ${timeText} এর জন্য বট এই গ্রুপে চুপ থাকবে।`, threadID, messageID);
  }

  return api.sendMessage("ℹ️ কমান্ড: /sumu on বা /sumu off [সময়]", threadID, messageID);
};

// টাইম কনভার্টার
function convertTime(text) {
  text = text.toLowerCase();
  const num = parseInt(text);
  if (text.includes("min")) return num * 60 * 1000;
  if (text.includes("hour")) return num * 60 * 60 * 1000;
  if (text.includes("day")) return num * 24 * 60 * 60 * 1000;
  return null;
  }
