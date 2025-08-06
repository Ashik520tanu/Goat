const ytdl = require('@neoxr/ytdl-core');
const ytSearch = require('yt-search');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "sing",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Search and play YouTube songs by name (Bangla & English supported)",
  commandCategory: "media",
  usages: "/sing [song name]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const query = args.join(" ");
  if (!query) return api.sendMessage("🔎 গানটির নাম লিখুন...\nউদাহরণ: /sing হারানো সুর", event.threadID, event.messageID);

  const search = await ytSearch(query);
  const videos = search.videos.slice(0, 6);
  if (videos.length === 0) return api.sendMessage("😓 কোনো গান খুঁজে পাওয়া যায়নি।", event.threadID, event.messageID);

  let msg = `🎵 গানের তালিকা (রিপ্লাই দিয়ে নম্বর দিন):\n\n`;
  videos.forEach((video, i) => {
    msg += `${i + 1}. ${video.title}\n⏱ সময়: ${video.timestamp} | 📺 চ্যানেল: ${video.author.name}\n\n`;
  });

  global._singQueue = global._singQueue || {};
  global._singQueue[event.senderID] = videos;

  return api.sendMessage(msg, event.threadID, (err, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: event.senderID,
      type: "choose"
    });
  });
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const index = parseInt(event.body);
  const videos = global._singQueue?.[event.senderID];

  if (!videos || isNaN(index) || index < 1 || index > videos.length)
    return api.sendMessage("❌ সঠিক সংখ্যা দিন (১-৬ এর মধ্যে)।", event.threadID, event.messageID);

  const chosen = videos[index - 1];
  const msg = `🎶 ডাউনলোড হচ্ছে: ${chosen.title}\n⏱ সময়: ${chosen.timestamp}`;

  api.sendMessage(msg, event.threadID, event.messageID);

  const stream = ytdl(chosen.url, { filter: 'audioonly' });
  const tempPath = path.join(__dirname, `cache/${event.senderID}_song.mp3`);
  const writeStream = fs.createWriteStream(tempPath);

  stream.pipe(writeStream);

  writeStream.on('finish', () => {
    api.sendMessage({
      body: `✅ গান প্রস্তুত 🎧\n${chosen.title}`,
      attachment: fs.createReadStream(tempPath)
    }, event.threadID, () => fs.unlinkSync(tempPath));
  });

  stream.on('error', (err) => {
    console.error(err);
    api.sendMessage("❌ ডাউনলোডে সমস্যা হয়েছে। আবার চেষ্টা করুন।", event.threadID);
  });
};
