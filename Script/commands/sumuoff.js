const fs = require("fs");
const path = __dirname + "/data/sumu_status.json";

module.exports.config = {
  name: "sumu",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "তোমার নাম",
  description: "Control bot reply system with optional timeout",
  commandCategory: "system",
  usages: "/sumu on | /sumu off 10 min/hour/days",
  cooldowns: 3,
};

module.exports.onLoad = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({ reply: true, timeout: null }, null, 2));
  }
};

function parseTime(amount, unit) {
  if (!amount || !unit) return null;
  switch (unit.toLowerCase()) {
    case "min":
    case "minute":
    case "minutes":
      return amount * 60000;
    case "hour":
    case "hours":
      return amount * 60 * 60000;
    case "day":
    case "days":
      return amount * 24 * 60 * 60000;
    default:
      return null;
  }
}

module.exports.run = async function({ api, event, args }) {
  let data = JSON.parse(fs.readFileSync(path));
  const input = args[0];

  if (!input) {
    return api.sendMessage(
      `🔘 বট রিপ্লাই স্টেটাস: ${data.reply ? "চালু ✅" : "বন্ধ ❌"}\n` +
      (data.timeout ? `⏳ টাইম সেট: ${new Date(data.timeout).toLocaleString()}` : ""),
      event.threadID
    );
  }

  if (input === "off") {
    let timeMsg = "";
    if (args[1] && args[2]) {
      const amount = parseInt(args[1]);
      const unit = args[2];
      const duration = parseTime(amount, unit);
      if (!duration) return api.sendMessage("❗ সময় ফরম্যাট ভুল!\nসঠিক ফরম্যাট: `/sumu off 10 min/hour/days`", event.threadID);

      data.reply = false;
      data.timeout = Date.now() + duration;
      timeMsg = `${amount} ${unit} এর জন্য`;
    } else {
      data.reply = false;
      data.timeout = null;
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`🤖 বট ${timeMsg || "পরবর্তী নির্দেশ না দেওয়া পর্যন্ত"} বন্ধ থাকবে!`, event.threadID);
  }

  if (input === "on") {
    data.reply = true;
    data.timeout = null;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage("✅ বট রিপ্লাই আবার চালু হলো!", event.threadID);
  }

  return api.sendMessage("❗ফরম্যাট ভুল!\nসঠিক উদাহরণ:\n/sumu off 10 min\n/sumu off 1 hour\n/sumu on", event.threadID);
};

module.exports.handleEvent = async function({ api, event }) {
  let data = JSON.parse(fs.readFileSync(path));
  const now = Date.now();

  if (data.timeout && now >= data.timeout) {
    data.reply = true;
    data.timeout = null;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  }

  if (!data.reply) return;
};
