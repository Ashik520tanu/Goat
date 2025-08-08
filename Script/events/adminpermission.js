const fs = require("fs-extra");
const path = require("path");
const DATA_PATH = path.join(__dirname, "../pendingGroups.json");  // তুমি পাথটা বটের ফাইল স্ট্রাকচার অনুযায়ী ঠিক করবে
const ADMIN_ID = "61573008832911";  // তোমার UID

if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, JSON.stringify({ approved: [], pending: [] }, null, 2));
}

function loadData() {
  try {
    return fs.readJsonSync(DATA_PATH);
  } catch {
    return { approved: [], pending: [] };
  }
}

function saveData(data) {
  fs.writeJsonSync(DATA_PATH, data, { spaces: 2 });
}

module.exports = async function ({ api, event }) {
  if (!event.isGroup) return;

  console.log("🟢 New group event detected:", event.threadID, event.threadName);

  const data = loadData();

  if (!data.approved.includes(event.threadID) && !data.pending.includes(event.threadID)) {
    data.pending.push(event.threadID);
    saveData(data);

    const msg = `🆕 নতুন গ্রুপে বট যোগ দেওয়া হয়েছে:\n\n` +
      `Group ID: ${event.threadID}\n` +
      `Group Name: ${event.threadName || "Unknown"}\n\n` +
      `অনুমতি দিতে চাইলে, এই গ্রুপ আইডি দিয়ে reply দিন অথবা সব গ্রুপকে অনুমতি দিতে "all" লিখুন।\n\n` +
      `অগ্রিম ধন্যবাদ!`;

    await api.sendMessage(msg, ADMIN_ID);
  }
};
