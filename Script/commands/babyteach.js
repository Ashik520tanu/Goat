const fs = require("fs");
const path = __dirname + "/cache/baby_memory.json";
const countPath = __dirname + "/cache/baby_teach_count.json";

module.exports.config = {
  name: "baby",
  version: "1.1",
  hasPermission: 0,
  credits: "𝐢𝐭'𝐳 𝐃𝐞𝐯𝐢𝐥 𝐛𝐨𝐭|ᵃˢʰⁱᵏ",
  description: "Teach Baby and she will remember your lessons",
  commandCategory: "fun",
  usages: "/baby teach প্রশ্ন - উত্তর\n/baby প্রশ্ন\n/baby forget প্রশ্ন",
  cooldowns: 2
};

module.exports.run = async function({ api, event, args }) {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
  if (!fs.existsSync(countPath)) fs.writeFileSync(countPath, JSON.stringify({}));

  let memory = JSON.parse(fs.readFileSync(path));
  let teachCount = JSON.parse(fs.readFileSync(countPath));

  const senderID = event.senderID;
  const content = args.join(" ").trim();

  // ======= TEACH COMMAND =======
  if (content.startsWith("teach")) {
    const parts = content.slice(5).split("-");
    if (parts.length < 2) {
      return api.sendMessage("❗প্রশ্ন - উত্তর এর ফর্মেটে লিখো:\n/baby teach সূর্য কোথায় উঠে - পূর্ব দিকে", event.threadID, event.messageID);
    }

    const question = parts[0].trim().toLowerCase();
    const answer = parts[1].trim();

    memory[question] = answer;

    // Count Teach
    teachCount[senderID] = (teachCount[senderID] || 0) + 1;

    fs.writeFileSync(path, JSON.stringify(memory, null, 2));
    fs.writeFileSync(countPath, JSON.stringify(teachCount, null, 2));

    return api.sendMessage(`✅ বেবি শিখে ফেলেছে!\n\n📌 প্রশ্ন: ${question}\n📌 উত্তর: ${answer}\n\n👤 Teach Count: ${teachCount[senderID]}`, event.threadID, event.messageID);
  }

  // ======= FORGET COMMAND =======
  if (content.startsWith("forget")) {
    const question = content.slice(6).trim().toLowerCase();
    if (!memory[question]) {
      return api.sendMessage("❌ এই প্রশ্নটি বেবি শেখেনি আগে!", event.threadID, event.messageID);
    }

    delete memory[question];
    fs.writeFileSync(path, JSON.stringify(memory, null, 2));
    return api.sendMessage(`🧠 বেবি ভুলে গেছে:\n${question}`, event.threadID, event.messageID);
  }

  // ======= ASKING COMMAND =======
  const question = content.toLowerCase();
  if (memory[question]) {
    return api.sendMessage(`🤖 ${memory[question]}`, event.threadID, event.messageID);
  } else {
    return api.sendMessage("❌ বেবি এটা এখনো শেখেনি!\n/baby teach প্রশ্ন - উত্তর দিয়ে শেখাও", event.threadID, event.messageID);
  }
};
