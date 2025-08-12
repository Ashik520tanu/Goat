const axios = require("axios");

module.exports.config = {
    name: "tempmail",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "ashik",
    description: "Free Temporary Email & Code Fetcher",
    commandCategory: "utility",
    usages: "/tempmail",
    cooldowns: 5
};

let tempMails = {};

module.exports.run = async function ({ api, event }) {
    try {
        const res = await axios.get("https://api.mail.tm/domains");
        const domain = res.data["hydra:member"][0].domain;
        const randomName = Math.random().toString(36).substring(2, 10);
        const email = `${randomName}@${domain}`;

        const pass = Math.random().toString(36).substring(2, 10);
        const accRes = await axios.post("https://api.mail.tm/accounts", {
            address: email,
            password: pass
        });

        const tokenRes = await axios.post("https://api.mail.tm/token", {
            address: email,
            password: pass
        });

        tempMails[event.threadID] = {
            email,
            pass,
            token: tokenRes.data.token
        };

        return api.sendMessage(`📧 আপনার Temp Mail তৈরি হয়েছে:\n${email}\n\nএই মেসেজে রিপ্লাই দিয়ে "code" লিখুন ইনবক্সে আসা কনফার্মেশন কোড পেতে।`, event.threadID, event.messageID);
    } catch (err) {
        return api.sendMessage("❌ Temp mail তৈরি করতে সমস্যা হয়েছে। পরে চেষ্টা করুন।", event.threadID, event.messageID);
    }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    if (!tempMails[event.threadID]) return;
    if (event.body.trim().toLowerCase() === "code") {
        try {
            const token = tempMails[event.threadID].token;
            const msgRes = await axios.get("https://api.mail.tm/messages", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (msgRes.data["hydra:member"].length === 0) {
                return api.sendMessage("📭 এখনো কোনো মেইল আসেনি। পরে চেষ্টা করুন।", event.threadID, event.messageID);
            }

            const latestMsgId = msgRes.data["hydra:member"][0].id;
            const mailData = await axios.get(`https://api.mail.tm/messages/${latestMsgId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const body = mailData.data.text;
            const codeMatch = body.match(/\b\d{4,8}\b/);
            const code = codeMatch ? codeMatch[0] : "কোড পাওয়া যায়নি।";

            return api.sendMessage(`📨 ইনবক্স থেকে প্রাপ্ত কোড: ${code}`, event.threadID, event.messageID);
        } catch (err) {
            return api.sendMessage("❌ মেইল পড়তে সমস্যা হয়েছে।", event.threadID, event.messageID);
        }
    }
};
