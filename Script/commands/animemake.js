const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "animemake",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ashik",
    description: "ছবিকে Anime স্টাইলে রূপান্তর করো",
    commandCategory: "image",
    usages: "[reply image]",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    try {
        if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
            return api.sendMessage("❌ অনুগ্রহ করে কোনো ছবিতে reply করে /anime লিখুন।", event.threadID, event.messageID);
        }

        const img = event.messageReply.attachments[0].url;
        const apiUrl = `https://api.itsrose.life/image/toanime?url=${encodeURIComponent(img)}`;

        api.sendMessage("🎨 আপনার ছবি Anime style-এ কনভার্ট হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...", event.threadID, event.messageID);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `anime_${Date.now()}.jpg`);
        fs.writeFileSync(imgPath, Buffer.from(response.data, 'binary'));

        api.sendMessage({ body: "✨ আপনার Anime style ছবি:", attachment: fs.createReadStream(imgPath) }, event.threadID, () => {
            fs.unlinkSync(imgPath);
        });

    } catch (error) {
        console.error(error);
        api.sendMessage("❌ ছবিকে কনভার্ট করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};
