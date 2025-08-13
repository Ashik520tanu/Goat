const axios = require("axios");

let tempMailData = {};

module.exports.config = {
  name: "tempmail",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Generate temp mail and check inbox",
  commandCategory: "utility",
  usages: "/tempmail",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    const domainList = ["1secmail.com", "1secmail.net", "1secmail.org"];
    const randomDomain = domainList[Math.floor(Math.random() * domainList.length)];
    const randomName = Math.random().toString(36).substring(2, 10);
    const email = `${randomName}@${randomDomain}`;

    tempMailData[event.senderID] = {
      email,
      login: randomName,
      domain: randomDomain
    };

    api.sendMessage(
      `✉️ আপনার Temp Mail তৈরি হয়েছে:\n${email}\n\nইনবক্স চেক করতে এই মেসেজে রিপ্লাই তে "code" লিখুন।`,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "check"
        });
      },
      event.messageID
    );
  } catch (e) {
    api.sendMessage("❌ Temp mail তৈরি করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (handleReply.author !== event.senderID) return;

  if (event.body && event.body.toLowerCase() === "code") {
    const userMail = tempMailData[event.senderID];
    if (!userMail) {
      return api.sendMessage("❌ আপনার জন্য কোনো temp mail নেই। আগে /tempmail ব্যবহার করুন।", event.threadID, event.messageID);
    }

    try {
      const { login, domain } = userMail;
      const inbox = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);

      if (inbox.data.length === 0) {
        return api.sendMessage("📭 ইনবক্সে এখনো কোনো মেইল আসেনি।", event.threadID, event.messageID);
      }

      let msgList = "";
      for (let m of inbox.data) {
        const mailContent = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${m.id}`);
        msgList += `📌 From: ${mailContent.data.from}\nSubject: ${mailContent.data.subject}\nDate: ${mailContent.data.date}\n\n${mailContent.data.textBody || "[No text content]"}\n\n-----------------\n`;
      }

      api.sendMessage(`📥 আপনার ইনবক্স:\n\n${msgList}`, event.threadID, event.messageID);

    } catch (e) {
      api.sendMessage("❌ ইনবক্স লোড করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
    }
  }
};
