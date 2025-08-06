const fs = require("fs-extra");
const path = require("path");
const ytdl = require("@neoxr/ytdl-core");
const yts = require("yt-search");

module.exports.config = {
  name: "sing",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "ashik",
  description: "Play any song as audio from YouTube",
  commandCategory: "media",
  usages: "[song name]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const song = args.join(" ");
  if (!song) return api.sendMessage("🎵 দয়া করে একটি গানের নাম লেখো...\n\nউদাহরণ: /sing suzume", event.threadID, event.messageID);

  try {
    const searchResults = await yts(song);
    const videos = searchResults.videos.slice(0, 6);

    if (videos.length === 0) return api.sendMessage("😥 কোনো গান পাওয়া যায়নি। আবার চেষ্টা করো!", event.threadID, event.messageID);

    let msg = "🎶 নিচের গানগুলো পাওয়া গেছে:\n\n";
    videos.forEach((v, i) => {
      msg += `${i + 1}. ${v.title}\n🕒 ${v.timestamp} | 📺 ${v.author.name}\n\n`;
    });
    msg += "✏️ যেকোনো একটি গানের নম্বর রিপ্লাই করো। (যেমন: 1)";

    return api.sendMessage({
      body: msg,
      attachment: await Promise.all(videos.map(v => global.utils.getStreamFromURL(v.thumbnail)))
    }, event.threadID, (err, info) => {
      global.client.handleReply.push({
        type: "chooseSong",
        name: module.exports.config.name,
        messageID: info.messageID,
        author: event.senderID,
        videos
      });
    }, event.messageID);
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ গান সার্চ করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করো।", event.threadID);
  }
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const { author, videos } = handleReply;

  if (event.senderID !== author) return;
  const choice = parseInt(event.body);

  if (isNaN(choice) || choice < 1 || choice > videos.length)
    return api.sendMessage("❗ দয়া করে তালিকা থেকে একটি সঠিক নম্বর দিন!", event.threadID, event.messageID);

  const selected = videos[choice - 1];
  const url = selected.url;
  const fileName = `${Date.now()}.mp3`;
  const filePath = path.join(__dirname, "cache", fileName);

  try {
    api.sendMessage(`🎧 "${selected.title}" গানটি ডাউনলোড হচ্ছে...`, event.threadID, event.messageID);

    const stream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio"
    });

    const writeStream = fs.createWriteStream(filePath);
    stream.pipe(writeStream);

    writeStream.on("finish", () => {
      api.sendMessage({
        body: `✅ "${selected.title}" গানটি নিচে দেওয়া হলো 🎶`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath));
    });

    stream.on("error", (error) => {
      console.error(error);
      return api.sendMessage("❌ গান ডাউনলোড করতে সমস্যা হয়েছে!", event.threadID);
    });
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ কোনো একটি ত্রুটি ঘটেছে গান প্লে করতে গিয়ে!", event.threadID);
  }
};
