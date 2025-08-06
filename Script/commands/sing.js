const yts = require("youtube-search-without-api-key");
const ytdl = require("ytdl-core");
const fs = require("fs-extra");

module.exports.config = {
  name: "sing",
  version: "1.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "গান খুঁজে প্লে করে",
  commandCategory: "media",
  usages: "[song name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const query = args.join(" ");
  if (!query) return api.sendMessage("🎵 গান এর নাম দিন (বাংলা/English)!", event.threadID, event.messageID);

  try {
    const results = await yts.search(query);
    if (!results || results.length === 0) return api.sendMessage("❌ গান পাওয়া যায়নি।", event.threadID);

    const list = results.slice(0, 6);
    global.singResults = list;

    let msg = "🎶 গান পাওয়া গেছে:\n\n";
    list.forEach((v, i) => {
      msg += `${i+1}. ${v.title} (${v.duration_raw || v.duration})\n\n`;
    });
    msg += "➡️ একটি নম্বর রিপ্লাই করো।";

    return api.sendMessage(msg, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: "sing",
        messageID: info.messageID,
        author: event.senderID,
        type: "choose"
      });
    }, event.messageID);

  } catch (e) {
    console.error(e);
    return api.sendMessage("⚠️ গান খোঁজার সময় সমস্যা হয়েছে। পরে আবার চেষ্টা করো!", event.threadID);
  }
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  if (event.senderID != handleReply.author) return;
  const choice = parseInt(event.body);
  const song = global.singResults?.[choice-1];
  if (!song) return api.sendMessage("❌ সঠিক নম্বর দিন!", event.threadID);

  const url = `https://www.youtube.com/watch?v=${song.id.videoId || song.id}`;
  const filePath = __dirname + `/cache/${Date.now()}.mp3`;

  try {
    const stream = ytdl(url, { filter:"audioonly" });
    const writer = fs.createWriteStream(filePath);
    stream.pipe(writer);
    writer.on("finish", () => {
      api.sendMessage({ body: `✅ "${song.title}" গান পাঠানো হলো`, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID);
    });
  } catch {
    return api.sendMessage("❌ গান ডাউনলোডে সমস্যা হয়েছে!", event.threadID);
  }
};
