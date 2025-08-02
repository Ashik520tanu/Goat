const fs = require("fs");

module.exports.config = {
  name: "age",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Ashik520tanu",
  description: "নাম ও জন্ম তারিখ দিয়ে বয়স হিসাব করে (বছর, মাস, দিন সহ)",
  commandCategory: "utility",
  usages: "/age নাম - DD/MM/YYYY",
  cooldowns: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(" ");
  if (!input.includes("-")) {
    return api.sendMessage(
      "❌ অনুগ্রহ করে সঠিক ফরম্যাটে লিখুন:\n\n✅ /age নাম - DD/MM/YYYY\n\n📌 উদাহরণ: /age রিমা - 15/03/2005",
      event.threadID,
      event.messageID
    );
  }

  const [name, dobRaw] = input.split("-").map(item => item.trim());
  const [day, month, year] = dobRaw.split("/").map(num => parseInt(num));

  if (!day || !month || !year || month > 12 || day > 31) {
    return api.sendMessage("⚠️ জন্ম তারিখটি সঠিকভাবে দিন: DD/MM/YYYY", event.threadID, event.messageID);
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const reply = `📅 ${name} এর বয়স:\n👉 ${years} বছর, ${months} মাস এবং ${days} দিন 🥰`;
  return api.sendMessage(reply, event.threadID, event.messageID);
};
