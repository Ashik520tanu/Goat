const axios = require("axios");
const path = require("path");
const fs = require("fs");

const BASE_API_URL = "https://album-api-1ez5.onrender.com";

module.exports.config = {
 name: "album",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "Ullash",
 description: "Manage and view video/photo albums",
 usePrefix: true,
 prefix: true,
 category: "Media",
 commandCategory: "Media",
 usages:
 "Empty to see list, or album [category] to get media.",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
 const { threadID, messageID, senderID } = event;

 // Show album categories if no argument given or argument is "list"
 if (!args[0] || args[0].toLowerCase() === "list") {
 api.setMessageReaction("😘", messageID, () => {}, true);

 const albumOptionsPage1 = [
 "funny",
 "islamic",
 "sad",
 "anime",
 "cartoon",
 "lofi",
 "horny",
 "couple",
 "flower",
 "photo",
 ];
 const albumOptionsPage2 = [
 "aesthetic",
 "sigma",
 "lyrics",
 "cat",
 "18plus",
 "freefire",
 "football",
 "girl",
 "friends",
 "cricket",
 ];

 const formatOptions = (options, startIndex = 1) =>
 options
 .map((opt, i) => `🎀 | ${i + startIndex}. ${opt} 🐤`)
 .join("\n");

 const message =
 "❤️‍🩹 Choose an album category Baby <💝\n" +
 "✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
 formatOptions(albumOptionsPage1) +
 `\n✿━━━━━━━━━━━━━━━━━━━━━━━✿\n🔰 | Page [1/2]\nℹ | Type: ${global.config.PREFIX}album 2 - to see next page\n✿━━━━━━━━━━━━━━━━━━━━━━━✿`;

 if (args[0] !== "2") {
 await api.sendMessage(
 { body: message },
 threadID,
 (error, info) => {
 if (!error) {
 global.client.handleReply.push({
 name: this.config.name,
 type: "reply",
 messageID: info.messageID,
 author: senderID,
 link: albumOptionsPage1,
 });
 }
 },
 messageID
 );
 return;
 }

 // Page 2
 const message2 =
 "❤️‍🩹 Choose an album category Baby <💝\n" +
 "✿━━━━━━━━━━━━━━━━━━━━━━━✿\n" +
 formatOptions(albumOptionsPage2, 11) +
 "\n✿━━━━━━━━━━━━━━━━━━━━━━━✿\n🔰 | Page [2/2]\n✿━━━━━━━━━━━━━━━━━━━━━━━✿";

 await api.sendMessage(
 { body: message2 },
 threadID,
 (error, info) => {
 if (!error) {
 global.client.handleReply.push({
 name: this.config.name,
 type: "reply",
 messageID: info.messageID,
 author: senderID,
 link: albumOptionsPage2,
 });
 }
 },
 messageID
 );
 return;
 }

 // Valid album categories
 const validCategories = [
 "cartoon",
 "photo",
 "lofi",
 "sad",
 "islamic",
 "funny",
 "horny",
 "anime",
 "love",
 "baby",
 "lyrics",
 "sigma",
 "aesthetic",
 "cat",
 "flower",
 "ff",
 "sex",
 "girl",
 "football",
 "friend",
 "cricket",
 "couple",
 "18plus",
 "freefire",
 ];

 const command = args[0].toLowerCase();

 // If command is not valid category
 if (!validCategories.includes(command)) {
 return api.sendMessage(
 "Invalid category! Use the command without arguments to see the list.",
 threadID,
 messageID
 );
 }
 
 // ⛔️ Removed media upload section here

 return api.sendMessage(
 "⚠️ ভিডিও/ছবি যুক্ত করার অপশন বর্তমানে বন্ধ করা হয়েছে। শুধু ক্যাটাগরি দেখে ভিডিও/ছবি দেখা যাবে।",
 threadID,
 messageID
 );
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
 api.unsendMessage(handleReply.messageID);

 const adminID = "100044327656712"; // আপনার অনুমোদিত admin ID

 if (event.type === "message_reply") {
 const replyNum = parseInt(event.body);
 if (isNaN(replyNum)) {
 return api.sendMessage(
 "Please reply with a valid number from the list.",
 event.threadID,
 event.messageID
 );
 }

 // Combine both pages' categories
 const categories = [
 "funny",
 "islamic",
 "sad",
 "anime",
 "cartoon",
 "lofi",
 "horny",
 "couple",
 "flower",
 "photo",
 "aesthetic",
 "sigma",
 "lyrics",
 "cat",
 "18plus",
 "ff",
 "football",
 "girl",
 "friend",
 "cricket",
 ];

 if (replyNum < 1 || replyNum > categories.length) {
 return api.sendMessage("Invalid selection.", event.threadID, event.messageID);
 }

 const selectedCategory = categories[replyNum - 1];

 // Permission check for restricted categories
 if (
 (selectedCategory === "horny" || selectedCategory === "18plus" || selectedCategory === "sex") &&
 event.senderID !== adminID
 ) {
 return api.sendMessage(
 "You are not authorized for this category.",
 event.threadID,
 event.messageID
 );
 }

 // Captions for categories
 const captions = {
 funny: "Now Baby Funny video <🤣",
 islamic: "Now Baby Islamic video <😇",
 sad: "Now Baby Sad video <🥺",
 anime: "Now Baby Anime video <😘",
 cartoon: "Now Baby Cartoon video <😇",
 lofi: "Now Baby Lofi video <😇",
 horny: "Now Baby Horny video <🥵",
 love: "Now Baby Love video <😍",
 flower: "Now Baby Flower video <🌷🌸",
 photo: "Now Baby Random Photo <😙",
 aesthetic: "Now Baby Aesthetic video <😙",
 sigma: "Now Baby Sigma video <🐤",
 lyrics: "Now Baby Lyrics video <🥰",
 cat: "Now Baby Cat Video <😙",
 sex: "Now Baby Sex video <😙",
 ff: "Now Baby Free Fire Video <😙",
 football: "Now Baby Football video <😙",
 girl: "Now Baby Girl video <😙",
 friend: "Now Baby Friends video <😙",
 cricket: "Now Baby Cricket video <😙",
 couple: "Now Baby Couple video <😙",
 "18plus": "Now Baby 18+ video <😙",
 };

 try {
 const res = await axios.get(`${BASE_API_URL}/album?type=${selectedCategory}`);
 const mediaUrl = res.data.data;

 if (!mediaUrl) {
 return api.sendMessage(
 "এই ক্যাটাগরির জন্য কোনো ভিডিও/ছবি পাওয়া যায়নি।",
 event.threadID,
 event.messageID
 );
 }

 const imgRes = await axios.get(mediaUrl, { responseType: "arraybuffer" });
 const ext = path.extname(mediaUrl) || ".mp4";
 const filePath = path.join(__dirname, "cache", `album_${Date.now()}${ext}`);

 fs.writeFileSync(filePath, Buffer.from(imgRes.data, "binary"));

 api.sendMessage(
 {
 body: captions[selectedCategory] || "Here's your video/photo!",
 attachment: fs.createReadStream(filePath),
 },
 event.threadID,
 () => fs.unlinkSync(filePath),
 event.messageID
 );
 } catch (error) {
 console.error(error);
 api.sendMessage(
 "আবার চেষ্টা করুন, কিছু সমস্যা হয়েছে!",
 event.threadID,
 event.messageID
 );
 }
 }
}; 
