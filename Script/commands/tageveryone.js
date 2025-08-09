module.exports.config = {
    name: "tag2",
    version: "1.0.0",
    hasPermssion: 2, // শুধু বট এডমিন ইউজ করতে পারবে
    credits: "ashik",
    description: "Everyone কে বারবার মেনশন দেবে",
    commandCategory: "group",
    usages: "/tag2 everyone <বার>",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;

    // শুধু 'everyone' চেক করা
    if (!args[0] || args[0].toLowerCase() !== "everyone") {
        return api.sendMessage("❌ সঠিক ব্যবহার: /tag2 everyone <বার>", threadID, messageID);
    }

    // কয়বার মেনশন দিবে
    let repeatCount = parseInt(args[1]) || 1;
    if (repeatCount > 150) repeatCount = 150;

    // মেনশন করার জন্য মেসেজ বানানো
    const mentionText = "@everyone";
    const mentions = [{
        tag: mentionText,
        id: "100000000000000" // Everyone মেনশনের জন্য একটা ডামি ID
    }];

    // লুপ করে পাঠানো
    for (let i = 0; i < repeatCount; i++) {
        await new Promise(resolve => setTimeout(resolve, 500)); // স্প্যাম এড়াতে 0.5 সেকেন্ড গ্যাপ
        api.sendMessage({ body: mentionText, mentions }, threadID);
    }
};
