const fs = require("fs");
const path = __dirname + "/list_data.json";

module.exports.config = {
  name: "list",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "Ashik x GPT",
  description: "Manage custom list with amount & note",
  commandCategory: "utility",
  usages: "[add/update/dlt/teach/help]",
  cooldowns: 5
};

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID } = event;
  if (!fs.existsSync(path)) fs.writeFileSync(path, "[]");
  let data = JSON.parse(fs.readFileSync(path));

  const subCmd = args[0];

  // 🆘 Help Menu
  if (!subCmd || subCmd === "help") {
    return api.sendMessage(
      `📋 𝗟𝗶𝘀𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗨𝘀𝗲𝗴𝗲:\n\n` +
      `✨ /list add name - amount - note ➤ Add a new entry\n` +
      `🔁 /list update name - new_amount - new_note ➤ Update entry\n` +
      `❌ /list dlt name ➤ Remove entry\n` +
      `📜 /list teach ➤ Show all entries\n` +
      `🔍 /list teach name ➤ Show specific\n`,
      threadID, messageID
    );
  }

  // ➕ Add Entry
  if (subCmd === "add") {
    const input = args.slice(1).join(" ").split(" - ");
    if (input.length < 3)
      return api.sendMessage("⚠️ Syntax: /list add name - amount - note", threadID, messageID);

    const [name, amount, note] = input;
    if (isNaN(amount)) return api.sendMessage("🔢 Amount should be a number!", threadID, messageID);

    if (data.find(item => item.name.toLowerCase() === name.toLowerCase()))
      return api.sendMessage("⚠️ এই নামটি লিস্টে আগে থেকেই আছে!", threadID, messageID);

    data.push({ name, amount: parseInt(amount), note });
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`✅ এন্ট্রি যুক্ত হয়েছে!\n📛 নাম: ${name}\n💰 Amount: ${amount}\n📝 Note: ${note}`, threadID, messageID);
  }

  // ♻️ Update Entry
  if (subCmd === "update") {
    const input = args.slice(1).join(" ").split(" - ");
    if (input.length < 3)
      return api.sendMessage("⚠️ Syntax: /list update name - new_amount - new_note", threadID, messageID);

    const [name, newAmount, newNote] = input;
    if (isNaN(newAmount)) return api.sendMessage("🔢 নতুন Amount অবশ্যই সংখ্যা হতে হবে!", threadID, messageID);

    const entry = data.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (!entry) return api.sendMessage("❌ এই নাম লিস্টে নেই!", threadID, messageID);

    entry.amount = parseInt(newAmount);
    entry.note = newNote;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`🔁 আপডেট সম্পন্ন!\n📛 নাম: ${entry.name}\n💰 Amount: ${entry.amount}\n📝 Note: ${entry.note}`, threadID, messageID);
  }

  // ❌ Delete Entry
  if (subCmd === "dlt") {
    const name = args.slice(1).join(" ");
    const index = data.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
    if (index === -1) return api.sendMessage("⚠️ এই নাম লিস্টে নেই!", threadID, messageID);

    data.splice(index, 1);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`❌ '${name}' নামের এন্ট্রি মুছে ফেলা হয়েছে!`, threadID, messageID);
  }

  // 📜 Show All or Single
  if (subCmd === "teach") {
    const name = args.slice(1).join(" ");
    if (!name) {
      if (data.length === 0) return api.sendMessage("🚫 এখনো কোনো লিস্ট নেই!", threadID, messageID);
      let msg = "📋 All Entries:\n\n";
      data.forEach((item, index) => {
        msg += `🔢 ${index + 1}. ${item.name}\n💰 Amount: ${item.amount}\n📝 Note: ${item.note}\n\n`;
      });
      return api.sendMessage(msg.trim(), threadID, messageID);
    } else {
      const entry = data.find(item => item.name.toLowerCase() === name.toLowerCase());
      if (!entry) return api.sendMessage("🔍 কোনো এন্ট্রি খুঁজে পাওয়া যায়নি!", threadID, messageID);
      return api.sendMessage(`📛 নাম: ${entry.name}\n💰 Amount: ${entry.amount}\n📝 Note: ${entry.note}`, threadID, messageID);
    }
  }

  // Unknown Command
  return api.sendMessage("❓ Unknown subcommand. Use /list help", threadID, messageID);
};
