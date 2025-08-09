module.exports.config = {
    name: "tag2",
    version: "1.0.0",
    hasPermssion: 2, // শুধুমাত্র বট অ্যাডমিন
    credits: "ashik",
    description: "বারবার everyone mention করা",
    commandCategory: "admin",
    usages: "/tag2 @everyone [সংখ্যা] বা /tag2 everyone [সংখ্যা]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    if (args.length < 2) {
        return api.sendMessage("ব্যবহার: /tag2 @everyone [সংখ্যা]", event.threadID, event.messageID);
    }

    let mentionWord = args[0].toLowerCase();
    let count = parseInt(args[1]);

    if (mentionWord === "@everyone" || mentionWord === "everyone") {
        if (isNaN(count) || count < 1 || count > 150) {
            return api.sendMessage("সংখ্যা 1-150 এর মধ্যে দিন!", event.threadID, event.messageID);
        }

        for (let i = 0; i < count; i++) {
            await new Promise(resolve => setTimeout(resolve, 500)); // অর্ধ সেকেন্ড গ্যাপ
            api.sendMessage("@everyone", event.threadID);
        }
    } else {
        api.sendMessage("শুধুমাত্র '@everyone' mention সমর্থিত!", event.threadID, event.messageID);
    }
};
