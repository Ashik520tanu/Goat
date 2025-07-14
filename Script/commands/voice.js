const axios = require("axios");
const fs = require("fs");
const request = require("request");

const emojiAudioMap = {
 "🥺": {
 url: "https://drive.google.com/uc?export=download&id=1Gyi-zGUv5Yctk5eJRYcqMD2sbgrS_c1R",
 caption: "মিস ইউ বেপি...🥺"
 },
 "😍": {
 url: "https://drive.google.com/uc?export=download&id=1lIsUIvmH1GFnI-Uz-2WSy8-5u69yQ0By",
 caption: "তোমার প্রতি ভালোবাসা দিনকে দিন বাড়ছে... 😍"
 },
 "😭": {
 url: "https://drive.google.com/uc?export=download&id=1qU27pXIm5MV1uTyJVEVslrfLP4odHwsa",
 caption: "জান তুমি কান্না করতেছো কোনো... 😭"
 },
 "😡": {
 url: "https://drive.google.com/uc?export=download&id=1S_I7b3_f4Eb8znzm10vWn99Y7XHaSPYa",
 caption: "রাগ কমাও, মাফ করাই বড়ত্ব... 😡"
 },
 "🙄": {
 url: "https://drive.google.com/uc?export=download&id=1gtovrHXVmQHyhK2I9F8d2Xbu7nKAa5GD",
 caption: "এভাবে তাকিও না তুমি ভেবে লজ্জা লাগে ... 🙄"
 },
 "😑": {
 url: "https://drive.google.com/uc?export=download&id=1azElOD2QeaMbV2OdCY_W3tErD8JQ3T7P",
 caption: "লেবু খাও জান সব ঠিক হয়ে যাবে 😑"
 },
 "😒": {
 url: "https://drive.google.com/uc?export=download&id=1tbKe8yiU0RbINPlQgOwnig7KPXPDzjXv",
 caption: "বিরক্ত করো না জান... ❤️"
 },
 "🤣": {
 url: "https://drive.google.com/uc?export=download&id=1Hvy_Xee8dAYp-Nul7iZtAq-xQt6-rNpU",
 caption: "হাসলে তোমাকে পাগল এর মতো লাগে... 🤣"
 },
 "💔": {
 url: "https://drive.google.com/uc?export=download&id=1jQDnFc5MyxRFg_7PsZXCVJisIIqTI8ZY",
 caption: "feel this song... 💔"
 },
 "🙂": {
 url: "https://cdn.fbsbx.com/v/t59.3654-21/518103422_770506668875168_8400071925893932225_n.mp4/audioclip-1752215226000-3181.mp4?_nc_cat=104&ccb=1-7&_nc_sid=d61c36&_nc_eui2=AeH4TFXdq4ocx_s5dvqAPfkJ_NBVDpPGcpf80FUOk8Zyl1WR-xp-jmhxEq1unuBbicLiEwS90ZRWiKst7SbBxHcb&_nc_ohc=de6ZHoMQ5zUQ7kNvwFoFtRi&_nc_oc=AdlO8MkVZ3ZrqqQA2ZMbZpnhw0Yf6_aOPvAETQekbb0-cV1GrcjPOuVC7xJwIAKfSXc&_nc_zt=28&_nc_ht=cdn.fbsbx.com&_nc_gid=OEJRVgHtqzuegC7zw0IAFA&oh=03_Q7cD2wF27mYX4Rh7p6cJWyZWZ4-u2rjmWRCyhQEJsVXm82zRTg&oe=68769F39&dl=1",
 caption: "তুমার নানির হেডা ... 🙂"
 }
};

module.exports.config = {
 name: "emoji_voice",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Islamick Chat Modified by Cyber-Sujon",
 description: "10 emoji = 10 voice response",
 commandCategory: "noprefix",
 usages: "🥺 😍 😭 etc.",
 cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
 const { threadID, messageID, body } = event;
 if (!body) return;

 const emoji = body.trim();
 const audioData = emojiAudioMap[emoji];

 if (!audioData) return;

 const filePath = `${__dirname}/cache/${encodeURIComponent(emoji)}.mp3`;

 const callback = () => api.sendMessage({
 body: `╭•┄┅════❁🌺❁════┅┄•╮\n\n${audioData.caption}\n\n╰•┄┅════❁🌺❁════┅┄•╯`,
 attachment: fs.createReadStream(filePath)
 }, threadID, () => fs.unlinkSync(filePath), messageID);

 const stream = request(encodeURI(audioData.url));
 stream.pipe(fs.createWriteStream(filePath)).on("close", () => callback());
};

module.exports.run = () => {};
