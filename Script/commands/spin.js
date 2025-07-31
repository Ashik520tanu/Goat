const fs = require("fs");
const path = __dirname + "/cache/spin.json";

if (!fs.existsSync(path)) fs.writeFileSync(path, "{}");

module.exports.config = {
  name: "spin",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ChatGPT",
  description: "পয়েন্ট দিয়ে স্পিন করুন",
  commandCategory: "game",
  usages: "[amount]",
  cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
  const userID = event.senderID;
  const spinData = JSON.parse(fs.readFileSync(path));
  let points = spinData[userID] || 20000;

  // যদি /spintk হয়
  if (args.length === 0) {
    return api.sendMessage(`💰 আপনার মোট পয়েন্ট: ${points}`, event.threadID, event.messageID);
  }

  const bet = parseInt(args[0]);
  if (isNaN(bet) || bet <= 0) {
    return api.sendMessage("❌ দয়া করে একটি সঠিক পরিমাণ দিন। যেমন: /spin 500", event.threadID, event.messageID);
  }

  if (points <= 0) {
    points = 20000;
  }

  if (bet > points) {
    return api.sendMessage(`❌ আপনার কাছে ${points} পয়েন্ট আছে, কিন্তু আপনি ${bet} দিতে চাচ্ছেন।`, event.threadID, event.messageID);
  }

  const win = Math.random() < 0.5;
  if (win) {
    points += bet;
    msg = `🎉 আপনি জিতেছেন!\n➕ পেয়েছেন: ${bet} পয়েন্ট\n💰 মোট পয়েন্ট: ${points}`;
  } else {
    points -= bet;
    msg = `😢 আপনি হেরেছেন!\n➖ কাটা গেছে: ${bet} পয়েন্ট\n💰 মোট পয়েন্ট: ${points <= 0 ? 20000 : points}`;
  }

  // পয়েন্ট ০ হলে আবার ২০০০০ দিয়ে শুরু
  spinData[userID] = points <= 0 ? 20000 : points;
  fs.writeFileSync(path, JSON.stringify(spinData, null, 2));

  return api.sendMessage(msg, event.threadID, event.messageID);
};
