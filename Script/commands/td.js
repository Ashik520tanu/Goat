const fs = require("fs");
const path = __dirname + "/td_data.json";

module.exports.config = {
  name: "td",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "ChatGPT-BD",
  description: "Truth or Dare game",
  commandCategory: "Fun",
  usages: "[truth/dare/rules/addtd/remove/list]",
  cooldowns: 3,
};

module.exports.onLoad = () => {
  if (!fs.existsSync(path)) {
    const defaultData = {
      truth: [
        "তুমি কি কাউকে একতরফা ভালোবেসেছো?",
        "তুমি শেষবার কখন কান্না করেছো?",
        "তুমি কি চুরি করেছো কখনো?",
        "তুমি কি এখনো কাউকে পছন্দ করো কিন্তু বলোনি?",
        "তুমি কখনো কাউকে ঠকিয়েছো?",
      ],
      dare: [
        "৫ বার টানা হেসে দেখাও",
        "একটা মজার ভিডিও পাঠাও",
        "যার নাম 'A' দিয়ে শুরু তাকে একটা পিক পাঠাও",
        "মুখ বন্ধ রেখে ১০ শব্দ বলো",
        "বিছানার নীচে কী আছে দেখাও",
      ],
    };
    fs.writeFileSync(path, JSON.stringify(defaultData, null, 2));
  }
};

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  const subCmd = args[0]?.toLowerCase();

  if (!subCmd) {
    return api.sendMessage("❓ Truth না Dare? বেছে নাও...\n👉 রিপ্লাই করো 'truth' অথবা 'dare'", threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choose",
      });
    }, messageID);
  }

  if (subCmd == "rules") {
    return api.sendMessage(
      `📜 𝑻𝒓𝒖𝒕𝒉 𝒐𝒓 𝑫𝒂𝒓𝒆 𝑹𝒖𝒍𝒆𝒔:\n
1. /td ➤ Truth বা Dare খেলবে
2. /addtd truth - প্রশ্ন | প্রশ্ন
3. /addtd dare - চ্যালেঞ্জ | চ্যালেঞ্জ
4. /td remove truth - প্রশ্ন
5. /td remove dare - চ্যালেঞ্জ
6. /tdlist ➤ truth & dare লিস্ট
7. /tdlist truth ➤ শুধুমাত্র truth গুলো
8. /tdlist dare ➤ শুধুমাত্র dare গুলো`,
      threadID, messageID
    );
  }

  if (subCmd == "addtd") {
    const type = args[1]?.toLowerCase();
    if (!["truth", "dare"].includes(type)) return api.sendMessage("⚠️ add করতে হলে /addtd truth - প্রশ্ন দিন", threadID, messageID);
    const content = args.slice(2).join(" ").split(" - ")[1];
    if (!content) return api.sendMessage("⚠️ প্রশ্ন দিন /addtd truth - প্রশ্ন", threadID, messageID);

    const newEntries = content.split("|").map(e => e.trim()).filter(Boolean);
    data[type].push(...newEntries);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`✅ ${newEntries.length} টি ${type.toUpperCase()} যোগ হয়েছে!`, threadID, messageID);
  }

  if (subCmd == "remove") {
    const type = args[1]?.toLowerCase();
    const q = args.slice(2).join(" ").split(" - ")[1];
    if (!["truth", "dare"].includes(type) || !q) return api.sendMessage("⚠️ /td remove truth - প্রশ্ন", threadID, messageID);
    const index = data[type].indexOf(q.trim());
    if (index === -1) return api.sendMessage("❌ প্রশ্ন পাওয়া যায়নি!", threadID, messageID);
    data[type].splice(index, 1);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`🗑️ ${type.toUpperCase()} থেকে প্রশ্ন রিমুভ হয়েছে!`, threadID, messageID);
  }

  if (subCmd == "list" || subCmd == "tdlist") {
    const showType = args[1]?.toLowerCase();
    if (showType == "truth") {
      const list = data.truth.map((q, i) => `${i + 1}. 🤔 ${q}`).join("\n");
      return api.sendMessage(`📘 𝑻𝒓𝒖𝒕𝒉 𝑳𝒊𝒔𝒕:\n\n${list}`, threadID, messageID);
    } else if (showType == "dare") {
      const list = data.dare.map((q, i) => `${i + 1}. 😈 ${q}`).join("\n");
      return api.sendMessage(`📕 𝑫𝒂𝒓𝒆 𝑳𝒊𝒔𝒕:\n\n${list}`, threadID, messageID);
    } else {
      const t = data.truth.map((q, i) => `${i + 1}. 🤔 ${q}`).join("\n");
      const d = data.dare.map((q, i) => `${i + 1}. 😈 ${q}`).join("\n");
      return api.sendMessage(`📘 Truth List:\n${t}\n\n📕 Dare List:\n${d}`, threadID, messageID);
    }
  }

  return api.sendMessage("❓ অজানা সাবকমান্ড! `/td rules` লিখে গাইড দেখুন।", threadID, messageID);
};

module.exports.handleReply = async function ({ handleReply, event, api }) {
  const { threadID, messageID, senderID, body } = event;
  if (handleReply.author != senderID) return;
  const data = JSON.parse(fs.readFileSync(path, "utf8"));

  if (handleReply.type == "choose") {
    const choice = body.toLowerCase();
    if (choice == "truth") {
      const q = data.truth[Math.floor(Math.random() * data.truth.length)];
      return api.sendMessage(`🤔 Truth:\n${q}`, threadID, messageID);
    } else if (choice == "dare") {
      const d = data.dare[Math.floor(Math.random() * data.dare.length)];
      return api.sendMessage(`😈 Dare:\n${d}`, threadID, messageID);
    } else {
      return api.sendMessage("⚠️ শুধু 'truth' বা 'dare' লিখো!", threadID, messageID);
    }
  }
};
