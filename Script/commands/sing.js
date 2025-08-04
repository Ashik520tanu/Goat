const axios = require("axios");
const ytdl = require("@neoxr/ytdl-core");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "sing",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Play a song by name",
  commandCategory: "media",
  usages: "/sing [song name]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const song = args.join(" ");
  if (!song) return api.sendMessage("🎵 গানটির নাম লিখুন।\nউদাহরণ: /sing valo achi", event.threadID);

  try {
    const msg = await api.sendMessage("🔍 গান খোঁজা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...", event.threadID);

    const { data } = await axios.get(`https://api.safone.dev/api/youtube/search?q=${encodeURIComponent(song)}`);
    const videos = data?.data?.slice(0, 6);
    if (!videos || videos.length === 0) return api.sendMessage("❌ কোনো গান পাওয়া যায়নি।", event.threadID, event.messageID);

    let list = "";
    const attachments = [];
    const selectionMap = {};

    videos.forEach((vid, i) => {
      list += `${i + 1}. ${vid.title}\n📺 চ্যানেল: ${vid.channel}\n🕒 সময়: ${vid.duration}\n\n`;
      attachments.push({
        type: "photo",
        url: vid.thumbnail,
      });
      selectionMap[i + 1] = vid.url;
    });

    api.sendMessage(
      {
        body: `🎶 নিচের থেকে একটি গান নির্বাচন করুন:\n\n${list}✏️ রিপ্লাই করে 1-6 এর মধ্যে একটি নম্বর দিন`,
        attachment: [],
      },
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          selectionMap,
        });
      }
    );
  } catch (e) {
    console.error(e);
    api.sendMessage("⚠️ সমস্যা হয়েছে গান খোঁজার সময়। পরে আবার চেষ্টা করুন।", event.threadID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (parseInt(event.body) < 1 || parseInt(event.body) > 6)
    return api.sendMessage("❌ অনুগ্রহ করে 1 থেকে 6 এর মধ্যে একটি সংখ্যা দিন।", event.threadID, event.messageID);

  const url = handleReply.selectionMap[parseInt(event.body)];
  const msg = await api.sendMessage("🎧 গান ডাউনলোড হচ্ছে, একটু অপেক্ষা করুন...", event.threadID);

  try {
    const filePath = path.join(__dirname, `sing_${event.senderID}.mp3`);
    const stream = await ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const writeStream = fs.createWriteStream(filePath);
    stream.pipe(writeStream);
    writeStream.on("finish", () => {
      api.unsendMessage(msg.messageID);
      api.sendMessage(
        {
          body: "✅ নিচে আপনার গান 🎵",
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (err) {
    console.error(err);
    api.sendMessage("❌ গান ডাউনলোড করতে সমস্যা হয়েছে।", event.threadID);
  }
};
