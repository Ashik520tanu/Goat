const fs = require("fs");
const path = __dirname + "/../../cache/baby_memory.json";
const countPath = __dirname + "/../../cache/baby_teach_count.json";

module.exports.config = {
  name: "baby teach",
  version: "1.3",
  hasPermission: 0,
  credits: "Ashuu",
  description: "Teach Baby to remember things and reply",
  commandCategory: "fun",
  usages: "[teach/forget/stats] or question",
  cooldowns: 2
};

module.exports.run = async function({ api, event, args, Users }) {
  if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");
  if (!fs.existsSync(countPath)) fs.writeFileSync(countPath, "{}");

  const memory = JSON.parse(fs.readFileSync(path));
  const teachCount = JSON.parse(fs.readFileSync(countPath));

  const senderID = event.senderID;
  const content = args.join(" ").trim();

  // === Teach ===
  if (content.toLowerCase().startsWith("teach")) {
    const parts = content.slice(5).split("-");
    if (parts.length < 2) {
      return api.sendMessage("📚 ফরম্যাট: /baby teach প্রশ্ন - উত্তর", event.threadID, event.messageID);
    }
    const question = parts[0].trim().toLowerCase();
    const answer = parts[1].trim();

    memory[question] = answer;
    teachCount[senderID] = (teachCount[senderID] || 0) + 1;

    fs.writeFileSync(path, JSON.stringify(memory, null, 2));
    fs.writeFileSync(countPath, JSON.stringify(teachCount, null, 2));

    return api.sendMessage(`✅ শেখানো হয়েছে!\n📌 প্রশ্ন: ${question}\n📌 উত্তর: ${answer}\n👤 আপনি ${teachCount[senderID]} বার বেবিকে শেখালেন।`, event.threadID, event.messageID);
  }

  // === Forget ===
  if (content.toLowerCase().startsWith("forget")) {
    const question = content.slice(6).trim().toLowerCase();
    if (!memory[question]) {
      return api.sendMessage("❌ বেবি এটা আগে জানতো না।", event.threadID, event.messageID);
    }
    delete memory[question];
    fs.writeFileSync(path, JSON.stringify(memory, null, 2));
    return api.sendMessage(`🧠 ভুলে গেছে বেবি:\n${question}`, event.threadID, event.messageID);
  }

  // === Stats ===
  if (content.toLowerCase() === "stats") {
    const sorted = Object.entries(teachCount).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) {
      return api.sendMessage("👶 এখনো কেউ কিছু শেখায়নি বেবিকে!", event.threadID, event.messageID);
    }

    let msg = "📊 Baby Teach Stats:\n";
    for (let i = 0; i < sorted.length; i++) {
      const [uid, count] = sorted[i];
      const name = (await Users.getNameUser(uid)) || "Unknown";
      msg += `${i + 1}. ${name} ➤ ${count} বার\n`;
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  // === Reply if known ===
  const question = content.toLowerCase();
  if (memory[question]) {
    return api.sendMessage(memory[question], event.threadID, event.messageID);
  } else {
    return api.sendMessage("🤔 বেবি এটা জানে না! শেখাতে চাইলে:\n/baby teach প্রশ্ন - উত্তর", event.threadID, event.messageID);
  }
};
