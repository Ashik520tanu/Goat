module.exports.config = {
  name: "accept",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ashik",
  description: "Manage group permission: accept groups manually",
  commandCategory: "admin",
  usages: "/accept list | /accept <groupID> | /accept all",
  cooldowns: 5,
  dependencies: {
    "fs-extra": ""
  }
};

const fs = global.nodemodule["fs-extra"];
const path = require("path");
const DATA_PATH = path.join(__dirname, "pendingGroups.json");
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

module.exports.run = async function({ api, event, args }) {
  if (event.senderID != ADMIN_ID) return;

  const data = loadData();

  if (!args[0]) return api.sendMessage("❌ Usage:\n/accept list\n/accept <groupID>\n/accept all", event.threadID);

  const cmd = args[0].toLowerCase();

  if (cmd === "list") {
    if (data.pending.length === 0) return api.sendMessage("✨ কোনো পেন্ডিং গ্রুপ নেই।", event.threadID);

    let msg = "⏳ পেন্ডিং গ্রুপসমূহ:\n\n";
    data.pending.forEach((g, i) => {
      msg += `${i + 1}. ${g}\n`;
    });
    return api.sendMessage(msg, event.threadID);
  }

  if (cmd === "all") {
    if (data.pending.length === 0) return api.sendMessage("❌ কোনো পেন্ডিং গ্রুপ নেই।", event.threadID);

    for (const groupID of [...data.pending]) {
      if (!data.approved.includes(groupID)) {
        data.approved.push(groupID);
        data.pending = data.pending.filter(g => g !== groupID);
        api.sendMessage(
          `💘𝗯𝗼𝘁 𝗮𝗽𝗽𝗿𝗼𝘃𝗲𝗱 𝗯𝘆 𝗺𝘆 𝗮𝗱𝗺𝗶𝗻 👑 𝗮𝘀𝗵𝗶𝗸 👑\n\n` +
          `🥰𝗻𝗼𝘄 𝘆𝗼𝘂 𝗰𝗮𝗻 𝘆𝗼𝘂 𝗯𝗼𝘁\n\n` +
          `🥺 𝗶𝗳 𝘁𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 𝗮𝗻𝘆 𝗽𝗿𝗼𝗯𝗹𝗲𝗺 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝘁𝗼 𝗺𝘆 𝗯𝗼𝘀𝘀🥳\n\n` +
          `✅𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗹𝗶𝗻𝗸\n\n` +
          `https://www.facebook.com/ashiklovetania\n\n` +
          `𝗶𝘁𝘇 𝗱𝗲𝘃𝗶𝗹 𝗯𝗼𝘁 | ᵃˢʰⁱᵏ❤️‍🩹`,
          groupID);
      }
    }
    saveData(data);
    return api.sendMessage(`✅ সব পেন্ডিং গ্রুপ অনুমোদিত হয়েছে।`, event.threadID);
  }

  const groupID = args[0];
  if (data.pending.includes(groupID)) {
    if (!data.approved.includes(groupID)) {
      data.approved.push(groupID);
      data.pending = data.pending.filter(g => g !== groupID);
      saveData(data);

      api.sendMessage(
        `💘𝗯𝗼𝘁 𝗮𝗽𝗽𝗿𝗼𝘃𝗲𝗱 𝗯𝘆 𝗺𝘆 𝗮𝗱𝗺𝗶𝗻 👑 𝗮𝘀𝗵𝗶𝗸 👑\n\n` +
        `🥰𝗻𝗼𝘄 𝘆𝗼𝘂 𝗰𝗮𝗻 𝘆𝗼𝘂 𝗯𝗼𝘁\n\n` +
        `🥺 𝗶𝗳 𝘁𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 𝗮𝗻𝘆 𝗽𝗿𝗼𝗯𝗹𝗲𝗺 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝘁𝗼 𝗺𝘆 𝗯𝗼𝘀𝘀🥳\n\n` +
        `✅𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗹𝗶𝗻𝗸\n\n` +
        `https://www.facebook.com/ashiklovetania\n\n` +
        `𝗶𝘁𝘇 𝗱𝗲𝘃𝗶𝗹 𝗯𝗼𝘁 | ᵃˢʰⁱᵏ❤️‍🩹`,
        groupID
      );

      return api.sendMessage(`✅ গ্রুপ ${groupID} অনুমোদিত হয়েছে।`, event.threadID);
    } else {
      return api.sendMessage("⚠️ এই গ্রুপটি ইতিমধ্যে অনুমোদিত।", event.threadID);
    }
  } else {
    return api.sendMessage("❌ এই গ্রুপটি পেন্ডিং লিস্টে নেই।", event.threadID);
  }
};

module.exports.onEvent = async function({ api, event }) {
  if (!event.isGroup) return;

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
