const axios = require("axios");
const ytdl = require("@neoxr/ytdl-core");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "sing",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "ashik",
  description: "Search and play a song as voice from YouTube",
  commandCategory: "media",
  usages: "/sing [song name]",
  cooldowns: 5
};

let globalSongCache = {};

module.exports.run = async ({ api, event, args }) => {
  const prompt = args.join(" ");
  if (!prompt) return api.sendMessage("🎵 গানটির নাম লিখুন, যেমন: /sing মন শুধু মন ছুঁয়েছে", event.threadID, event.messageID);

  try {
    api.sendMessage("🔍 গান খোঁজা হচ্ছে, একটু অপেক্ষা করো...", event.threadID, event.messageID);

    const res = await axios.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(prompt)}`);
    const videoIds = [...res.data.matchAll(/"videoId":"(.*?)"/g)].map(v => v[1]).filter((v, i, a) => a.indexOf(v) === i).slice(0, 6);

    if (videoIds.length === 0) return api.sendMessage("❌ কোনো গান খুঁজে পাওয়া যায়নি!", event.threadID, event.messageID);

    const results = [];
    globalSongCache[event.threadID] = [];

    for (let i = 0; i < videoIds.length; i++) {
      const id = videoIds[i];
      const info = await ytdl.getInfo(id);
      const { title, video_url, lengthSeconds, author, thumbnails } = info.videoDetails;
      const duration = new Date(lengthSeconds * 1000).toISOString().substr(11, 8);
      const channel = author.name;
      const thumb = thumbnails[thumbnails.length - 1].url;
      globalSongCache[event.threadID].push(id);
      results.push(`${i + 1}. ${title}\n📺 চ্যানেল: ${channel}\n⏱️ দৈর্ঘ্য: ${duration}\n🌄 ${thumb}`);
    }

    api.sendMessage(
      `🎶 নিচের গানগুলো পাওয়া গেছে "${prompt}" এর জন্য:\n\n${results.join("\n\n")}\n\n➡️ যেটা চাই তার নম্বর রিপ্লাই করো (১-${videoIds.length})`,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "choose_song"
        });
      }
    );
  } catch (e) {
    console.error(e);
    api.sendMessage("⚠️ অনাকাঙ্ক্ষিত ত্রুটি হয়েছে!", event.threadID, event.messageID);
  }
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const index = parseInt(event.body.trim());
  const threadID = event.threadID;

  if (isNaN(index) || index < 1 || index > globalSongCache[threadID]?.length) {
    return api.sendMessage("❌ সঠিক নম্বর দিন!", threadID, event.messageID);
  }

  const videoId = globalSongCache[threadID][index - 1];
  const info = await ytdl.getInfo(videoId);
  const title = info.videoDetails.title;
  const outputPath = path.join(__dirname, `${threadID}_${videoId}.mp3`);

  const stream = ytdl(videoId, { filter: 'audioonly' });
  const writeStream = fs.createWriteStream(outputPath);

  stream.pipe(writeStream);
  stream.on('end', () => {
    api.sendMessage(
      {
        body: `🎧 ${title}`,
        attachment: fs.createReadStream(outputPath)
      },
      threadID,
      () => fs.unlinkSync(outputPath)
    );
  });

  stream.on('error', (err) => {
    console.error(err);
    api.sendMessage("❌ গান ডাউনলোডে সমস্যা হয়েছে!", threadID);
  });
};
