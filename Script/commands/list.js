const fs = require("fs");
const path = __dirname + "/list_data.json";

module.exports.config = {
  name: "list",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Modified by ChatGPT",
  description: "Add, update, delete and view a simple list with name & amount",
  commandCategory: "Utility",
  usages: "[add/dlt/update/teach] [name] - [amount]",
  cooldowns: 5,
};

function loadData() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(path));
}

function saveData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports.run = function ({ event, args, api }) {
  const { threadID, messageID } = event;
  const command = args[0];
  const fullArgs = args.slice(1).join(" ");
  const data = loadData();

  if (!command) {
    return api.sendMessage(
      `📋 List Command Menu:\n\n` +
      `/listadd name - amount ➤ Add new person\n` +
      `/listupdate name - amount ➤ Update amount\n` +
      `/listdlt name ➤ Delete person\n` +
      `/listteach ➤ Show full list\n` +
      `/listteach name ➤ Show specific person\n` +
      `/list ➤ Show this help message`,
      threadID, messageID
    );
  }

  if (command == "add" || command == "listadd") {
    const [name, amount] = fullArgs.split(" - ");
    if (!name || !amount) return api.sendMessage("❌ Use: /listadd name - amount", threadID, messageID);
    data[name.toLowerCase()] = Number(amount);
    saveData(data);
    return api.sendMessage(`✅ Added ${name} with amount ${amount}`, threadID, messageID);
  }

  if (command == "update" || command == "listupdate") {
    const [name, amount] = fullArgs.split(" - ");
    if (!data[name.toLowerCase()]) return api.sendMessage("❌ Name not found in list", threadID, messageID);
    data[name.toLowerCase()] = Number(amount);
    saveData(data);
    return api.sendMessage(`✅ Updated ${name} to ${amount}`, threadID, messageID);
  }

  if (command == "dlt" || command == "listdlt") {
    const name = args[1];
    if (!data[name.toLowerCase()]) return api.sendMessage("❌ Name not found", threadID, messageID);
    delete data[name.toLowerCase()];
    saveData(data);
    return api.sendMessage(`🗑️ Deleted ${name} from list`, threadID, messageID);
  }

  if (command == "teach" || command == "listteach") {
    if (args[1]) {
      const name = args[1].toLowerCase();
      if (!data[name]) return api.sendMessage("❌ Not found in list", threadID, messageID);
      return api.sendMessage(`👤 ${args[1]} ➤ ${data[name]}৳`, threadID, messageID);
    } else {
      let msg = `📄 Full List:\n`;
      const entries = Object.entries(data);
      if (entries.length === 0) return api.sendMessage("📭 List is empty", threadID, messageID);
      for (let [name, amount] of entries) {
        msg += `• ${name} ➤ ${amount}৳\n`;
      }
      return api.sendMessage(msg.trim(), threadID, messageID);
    }
  }

  return api.sendMessage("❓ Unknown command. Use /list to see help.", threadID, messageID);
};
