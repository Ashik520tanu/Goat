const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "animemake",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ashik",
    description: "ছবি কে anime style-এ কনভার্ট করে দিবে",
    commandCategory: "image",
    usages: "/animemake [reply করে ছবি পাঠাও]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, type, messageReply } = event;

    if (type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length === 0) {
        return api.sendMessage("অনুগ্রহ করে `/animemake` কমান্ড লিখে কোনো ছবিতে reply করুন।", threadID, messageID);
    }

    const imgURL = messageReply.attachments[0].url;

    api.sendMessage("🎨 আপনার ছবি Anime style-এ কনভার্ট হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...", threadID, messageID);

    try {
        // ফ্রি anime style API
        const apiURL = `https://api.itsrose.rest/animefy?url=${encodeURIComponent(imgURL)}`;

        const response = await axios.get(apiURL, {
            responseType: "arraybuffer"
        });

        const imgPath = path.join(__dirname, `/cache/anime_${Date.now()}.jpg`);
        fs.writeFileSync(imgPath, Buffer.from(response.data, "binary"));

        api.sendMessage(
            {
                body: "✨ আপনার Anime Style ছবি প্রস্তুত!",
                attachment: fs.createReadStream(imgPath)
            },
            threadID,
            () => fs.unlinkSync(imgPath)
        );

    } catch (error) {
        console.error(error);
        api.sendMessage("❌ দুঃখিত, Anime Style ছবিতে কনভার্ট করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।", threadID, messageID);
    }
};
