const fs = require("fs");
const path = __dirname + "/td_data.json";

module.exports.config = {
  name: "td",
  version: "2.1.0",
  hasPermssion: 0,
  credits: "MiraiFix by ChatGPT",
  description: "Truth or Dare game with full control",
  commandCategory: "game",
  usages: "/td, /addtd, /td see, /td remove, /td rules",
  cooldowns: 2
};

module.exports.onLoad = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({ truth: [], dare: [] }, null, 2));
  }
};

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID } = event;

  const data = JSON.parse(fs.readFileSync(path));

  const send = msg => api.sendMessage(msg, threadID, messageID);

  if (args[0] == "rules") {
    return send(
      `🎮 𝗧𝗥𝗨𝗧𝗛 𝗢𝗥 𝗗𝗔𝗥𝗘 𝗥𝗨𝗟𝗘𝗦 🎯\n\n` +
      `/td ➝ Truth না Dare খেলবে সেটা জিজ্ঞেস করবে\n` +
      `/addtd truth প্রশ্ন - প্রশ্ন ➝ Truth যুক্ত করো\n` +
      `/addtd dare প্রশ্ন - প্রশ্ন ➝ Dare যুক্ত করো\n` +
      `/td remove truth প্রশ্ন ➝ Truth মুছবে\n` +
      `/td remove dare প্রশ্ন ➝ Dare মুছবে\n` +
      `/td see ➝ সমস্ত প্রশ্ন লিস্ট দেখাবে\n`
    );
  }

  if (args[0] == "see" || args[0] == "list") {
    const truthList = data.truth.map((q, i) => `✅ ${i + 1}. ${q}`).join("\n");
    const dareList = data.dare.map((q, i) => `🎯 ${i + 1}. ${q}`).join("\n");

    return send(
      `📜 𝗧𝗥𝗨𝗧𝗛 𝗟𝗜𝗦𝗧:\n${truthList || "❌ কিছুই নেই"}\n\n` +
      `📜 𝗗𝗔𝗥𝗘 𝗟𝗜𝗦𝗧:\n${dareList || "❌ কিছুই নেই"}`
    );
  }

  if (args[0] == "remove") {
    const type = args[1];
    const question = args.slice(2).join(" ");
    if (!["truth", "dare"].includes(type)) return send("❌ remove এর পর 'truth' অথবা 'dare' দিতে হবে।");
    const list = data[type];
    const index = list.indexOf(question);
    if (index == -1) return send(`❌ ${type} লিস্টে এই প্রশ্নটি নেই!`);
    list.splice(index, 1);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return send(`✅ ${type} থেকে প্রশ্নটি সরানো হয়েছে: "${question}"`);
  }

  if (args[0] == "addtd") {
    const type = args[1];
    const content = args.slice(2).join(" ").split(" - ").map(e => e.trim()).filter(Boolean);

    if (!["truth", "dare"].includes(type)) return send("❌ 'truth' বা 'dare' উল্লেখ করো।");
    if (content.length == 0) return send("⚠️ প্রশ্ন দিন ' - ' দিয়ে আলাদা করে।");

    const added = [];

    for (const q of content) {
      if (!data[type].includes(q)) {
        data[type].push(q);
        added.push(q);
      }
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return send(`✅ ${added.length}টি ${type} যুক্ত হয়েছে:\n${added.map(q => `• ${q}`).join("\n")}`);
  }

  // Game start
  if (args.length == 0) {
    return api.sendMessage("🙂 আপনি কি চান? Truth নাকি Dare?\nউত্তর দিন: 'truth' অথবা 'dare'", threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choose"
      });
    });
  }

  // Default fallback
  return send("⚠️ ভুল কমান্ড! ব্যবহার করুন /td rules");
};

module.exports.handleReply = async function ({ handleReply, event, api }) {
  const data = JSON.parse(fs.readFileSync(path));
  const { threadID, messageID, senderID } = event;
  const send = msg => api.sendMessage(msg, threadID, messageID);

  if (handleReply.type == "choose" && senderID == handleReply.author) {
    const reply = event.body.toLowerCase();
    if (reply == "truth") {
      if (data.truth.length == 0) return send("❌ এখনো কোনো Truth নেই!");
      const q = data.truth[Math.floor(Math.random() * data.truth.length)];
      return send(`🧠 𝗧𝗥𝗨𝗧𝗛:\n${q}`);
    } else if (reply == "dare") {
      if (data.dare.length == 0) return send("❌ এখনো কোনো Dare নেই!");
      const q = data.dare[Math.floor(Math.random() * data.dare.length)];
      return send(`🔥 𝗗𝗔𝗥𝗘:\n${q}`);
    } else {
      return send("⚠️ শুধু 'truth' বা 'dare' লিখুন।");
    }
  }
};
