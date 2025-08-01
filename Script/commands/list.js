const fs = require("fs");
const filePath = __dirname + "/listdata.json";

module.exports.config = {
  name: "listteach",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Ashik x ChatGPT",
  description: "List management system",
  commandCategory: "utility",
  usages: "/listteach",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));
  let data = JSON.parse(fs.readFileSync(filePath));

  const subcmd = args[0]?.toLowerCase();
  const name = args[1]?.toLowerCase();
  const fullArgs = args.join(" ");
  const amountMatch = fullArgs.match(/-(.*)/);
  const amount = amountMatch ? amountMatch[1].trim() : null;

  // ✅ Add
  if (subcmd === "add") {
    if (!name || !amount) return api.sendMessage("⚠️ ব্যবহার করুন: /listteach add name - amount", threadID, messageID);
    if (data.some(item => item.name === name)) return api.sendMessage("❌ এই নাম লিস্টে ইতিমধ্যেই আছে!", threadID, messageID);

    data.push({ name, amount });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return api.sendMessage(`✅ ${name} কে ${amount}৳ সহ লিস্টে যোগ করা হয়েছে।`, threadID, messageID);
  }

  // ✅ Update
  else if (subcmd === "update") {
    if (!name || !amount) return api.sendMessage("⚠️ ব্যবহার করুন: /listteach update name - newAmount", threadID, messageID);
    const item = data.find(item => item.name === name);
    if (!item) return api.sendMessage("❌ এই নাম লিস্টে নেই!", threadID, messageID);

    item.amount = amount;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return api.sendMessage(`🔁 ${name} এর এমাউন্ট এখন ${amount}৳ এ আপডেট হয়েছে।`, threadID, messageID);
  }

  // ✅ Delete
  else if (subcmd === "dlt") {
    if (!name) return api.sendMessage("⚠️ ব্যবহার করুন: /listteach dlt name", threadID, messageID);
    const index = data.findIndex(item => item.name === name);
    if (index === -1) return api.sendMessage("❌ এই নাম লিস্টে নেই!", threadID, messageID);

    data.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return api.sendMessage(`🗑️ ${name} কে লিস্ট থেকে মুছে ফেলা হয়েছে।`, threadID, messageID);
  }

  // ✅ Show All
  else if (!subcmd) {
    if (data.length === 0) return api.sendMessage("📭 লিস্ট এখন খালি!", threadID, messageID);
    const listText = data.map((item, index) => `${index + 1}. ${item.name} — ${item.amount}৳`).join("\n");
    return api.sendMessage(`📋 মোট ${data.length} জন:\n\n${listText}`, threadID, messageID);
  }

  // ✅ Show Single
  else {
    const found = data.find(item => item.name === subcmd);
    if (!found) return api.sendMessage("❌ এই নাম লিস্টে নেই!", threadID, messageID);
    return api.sendMessage(`🔍 ${found.name} এর এমাউন্ট: ${found.amount}৳`, threadID, messageID);
  }
};

// ✅ /list গাইড কমান্ড
module.exports.handleEvent = async function ({ event, api }) {
  const { body, threadID, messageID } = event;
  if (body?.toLowerCase() === "/list") {
    return api.sendMessage(
      `
📘 List Command Guide:

➕ /listteach add name - amount
🗑️ /listteach dlt name
✏️ /listteach update name - newAmount
📋 /listteach → সম্পূর্ণ লিস্ট
🔍 /listteach name → নির্দিষ্ট এমাউন্ট
`,
      threadID,
      messageID
    );
  }
};
