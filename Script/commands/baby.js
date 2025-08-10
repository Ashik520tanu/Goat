const axios = require('axios');

const baseApiUrl = async () => {
    const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
    return base.data.api;
};

module.exports.config = {
  name: "baby",
  version: "7.0.0",
  credits: "dipto + modified by GPT",
  cooldowns: 0,
  hasPermssion: 0,
  description: "Teach and chat with the bot",
  commandCategory: "chat",
  category: "chat",
  usePrefix: true,
  prefix: true,
  usages: `/baby teach [question] - [answer1], [answer2], [answer3]...`,
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!args[0]) {
      return api.sendMessage("❌ Please provide a command or text", event.threadID, event.messageID);
    }

    // Teach command (multiple answers)
    if (args[0] === 'teach') {
      const teachArgs = args.join(" ").substring(6); // remove 'teach '
      if (!teachArgs.includes(" - ")) {
        return api.sendMessage("❌ Invalid format! Use: /baby teach [question] - [ans1], [ans2], [ans3]...", event.threadID, event.messageID);
      }

      const [question, answerStr] = teachArgs.split(" - ");
      const answers = answerStr.split(",").map(a => a.trim()).filter(a => a.length > 0);

      if (!question || answers.length === 0) {
        return api.sendMessage("❌ Invalid format or no answers found!", event.threadID, event.messageID);
      }

      const replyData = answers.join(","); // send as comma separated
      const re = await axios.get(`${link}?teach=${encodeURIComponent(question)}&reply=${encodeURIComponent(replyData)}&senderID=${uid}`);
      const name = await Users.getName(re.data.teacher) || "unknown";
      return api.sendMessage(`✅ Added replies for "${question}"\nReplies: ${answers.join(", ")}\nTeacher: ${name}`, event.threadID, event.messageID);
    }

    // Normal chat mode
    const res = await axios.get(`${link}?text=${encodeURIComponent(dipto)}&senderID=${uid}&font=1`);
    return api.sendMessage(res.data.reply, event.threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: event.senderID
        });
      }
    }, event.messageID);

  } catch (e) {
    console.error(e);
    return api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    if (event.type === "message_reply") {
      const reply = event.body.toLowerCase();
      const b = (await axios.get(`${await baseApiUrl()}/baby?text=${encodeURIComponent(reply)}&senderID=${event.senderID}&font=1`)).data.reply;
      await api.sendMessage(b, event.threadID, (error, info) => {
        if (!error) {
          global.client.handleReply.push({
            name: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID
          });
        }
      }, event.messageID);
    }
  } catch (err) {
    return api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
  }
};
