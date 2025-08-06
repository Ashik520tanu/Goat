const axios = require("axios");
const fs = require("fs-extra");
const ytdl = require("ytdl-core");

module.exports.config = {
  name: "sing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "গানের তালিকা সহ ইউটিউব গান প্লে করে অডিও মেসেজ হিসেবে পাঠায়",
  commandCategory: "music",
  usages: "[song name]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  if (!args[0]) return api.sendMessage("🔍 একটি গান এর নাম লিখুন...\n\nযেমন: /sing suzume", event.threadID, event.messageID);

  const query = encodeURIComponent(args.join(" "));
  const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${query}&key=AIzaSyCcdX2Ttv7N_EbdZMTzLZfYkTfz_9r6jXA`;

  try {
    const res = await axios.get(searchUrl);
    const results = res.data.items;

    if (results.length === 0) return api.sendMessage("❌ কোন ফলাফল পাওয়া যায়নি।", event.threadID, event.messageID);

    let msg = "🎵 গান পাওয়া গেছে:\n\n";
    global.singResults = {};

    results.forEach((item, index) => {
      const { title, channelTitle, thumbnails } = item.snippet;
      const videoId = item.id.videoId;
      global.singResults[index + 1] = {
        title,
        videoId,
        thumbnail: thumbnails.high.url
      };
      msg += `${index + 1}. ${title}\n🧑‍💻 চ্যানেল: ${channelTitle}\n\n`;
    });

    msg += "➡️ একটি নাম্বার রিপ্লাই করে গানটি নির্বাচন করুন।";

    return api.sendMessage(msg, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: "sing",
        messageID: info.messageID,
        author: event.senderID,
        type: "choose"
      });
    }, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("⚠️ গান খোঁজার সময় সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।", event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID != handleReply.author) return;

  const choice = parseInt(event.body);
  const song = global.singResults?.[choice];

  if (!song) return api.sendMessage("❌ সঠিক নাম্বার দিন!", event.threadID, event.messageID);

  const url = `https://www.youtube.com/watch?v=${song.videoId}`;
  const filePath = __dirname + `/cache/${song.title}.mp3`;

  try {
    const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
    const writeStream = fs.createWriteStream(filePath);

    stream.pipe(writeStream);

    writeStream.on("finish", () => {
      api.sendMessage({
        body: `✅ ${song.title}\n🔗 ${url}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ গান ডাউনলোডে সমস্যা হয়েছে।", event.threadID, event.messageID);
  }
};
