const fs = require("fs");

module.exports.config = { name: "td", version: "1.1.0", hasPermssion: 0, credits: "Nayan", description: "Truth or Dare Game with Custom Additions", commandCategory: "game", usages: "/td", cooldowns: 3 };

const DATA_FILE = __dirname + "/td_data.json";

function ensureDataFile() { if (!fs.existsSync(DATA_FILE)) { const initialData = { truths: [], dares: [] }; fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2)); } }

module.exports.onLoad = () => ensureDataFile();

module.exports.run = async function ({ event, api, args }) { ensureDataFile(); const data = JSON.parse(fs.readFileSync(DATA_FILE));

const command = args[0]?.toLowerCase();

if (command === "rules") { return api.sendMessage( `📌 Truth or Dare Game Commands:

👉 /td - Start the game 👉 Reply with 'truth' or 'dare' 👉 /addtd truth <text> - Add a custom truth 👉 /addtd dare <text> - Add a custom dare 👉 /tdlist - View all truths and dares 👉 /td remove truth <index> - Remove truth 👉 /td remove dare <index> - Remove dare`, event.threadID, event.messageID ); }

if (command === "remove" && args[1]) { const type = args[1]; const index = parseInt(args[2]) - 1; if (!['truth', 'dare'].includes(type) || isNaN(index)) return api.sendMessage("⚠️ Usage: /td remove truth|dare <index>", event.threadID);

if (type === "truth" && data.truths[index]) {
  data.truths.splice(index, 1);
} else if (type === "dare" && data.dares[index]) {
  data.dares.splice(index, 1);
} else {
  return api.sendMessage("❌ Invalid index.", event.threadID);
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
return api.sendMessage(`✅ Removed ${type} at position ${index + 1}`, event.threadID);

}

if (command === "list" || command === "tdlist") { const truths = data.truths.map((t, i) => ${i + 1}. ${t}).join("\n"); const dares = data.dares.map((d, i) => ${i + 1}. ${d}).join("\n"); return api.sendMessage(📜 Truths:\n${truths || "None"}\n\n🎯 Dares:\n${dares || "None"}, event.threadID); }

if (command === "addtd") { const type = args[1]; const text = args.slice(2).join(" "); if (!['truth', 'dare'].includes(type) || !text) return api.sendMessage("⚠️ Usage: /addtd truth|dare <text>", event.threadID);

if (type === "truth") data.truths.push(text);
else if (type === "dare") data.dares.push(text);
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
return api.sendMessage(`✅ Added to ${type}: ${text}`, event.threadID);

}

if (!event.messageReply || !['truth', 'dare'].includes(event.body.toLowerCase())) { return api.sendMessage("🤔 আপনি কি চান? Truth না Dare? রিপ্লাই দিন 'truth' অথবা 'dare' লিখে!", event.threadID, (err, info) => { global.client.handleReply.push({ type: "td", name: module.exports.config.name, messageID: info.messageID }); }, event.messageID); } };

module.exports.handleReply = async function ({ api, event, handleReply }) { ensureDataFile(); const data = JSON.parse(fs.readFileSync(DATA_FILE));

const truths = data.truths.length ? data.truths : [ "তুমি কি কখনো কারো উপর ক্রাশ খেয়েছো যাকে তুমি চেনো না?", "তুমি কি কখনো কারো মেসেজ সিন করে রিপ্লাই করোনি?", "তুমি কি কখনো কাউকে মিথ্যা ভালোবাসি বলেছো?", "তোমার সবচেয়ে বড় ভয় কী?", "তুমি কি কখনো পরীক্ষায় নকল করেছো?", "তুমি কি কখনো কাউকে গোপনে পছন্দ করেছো?", "তুমি কি কখনো কাউকে অনুসরণ করেছো ফেসবুকে বা ইনস্টাগ্রামে?", "তুমি কি এখন কারো উপর ক্রাশ খাচ্ছো?", "শেষবার কাঁদছো কখন?", "তুমি কি কখনো কারো সাথে সম্পর্ক রেখে অন্য কারো সাথে কথা চালিয়েছো?", "তোমার জীবনের সবচেয়ে লজ্জার মুহূর্ত কোনটা?", "তুমি কি গোপনে কারো প্রোফাইল রেগুলার চেক করো?", "তুমি কি কখনো গালি দিয়ে পরে দুঃখ পেয়েছো?", "তুমি কি কখনো বান্ধবীর প্রাক্তনের উপর ক্রাশ খেয়েছো?", "তুমি কি এখনো এক্সকে ভুলতে পারোনি?", "তুমি কি কখনো ক্লাসে ঘুমিয়ে পরেছো?", "তুমি কি কখনো বন্ধুকে বিশ্বাস ভঙ্গ করেছো?", "তুমি কি নিজের সম্পর্কে মিথ্যা বলেছো কাউকে ইমপ্রেস করার জন্য?", "তোমার সবচেয়ে বাজে অভ্যাস কী?", "তুমি কি এখনো কোনো টেডি বিয়ার নিয়ে ঘুমাও?" ];

const dares = data.dares.length ? data.dares : [ "তুমি এখনই নিজের একটা ফানি ছবি তুলে পাঠাও!", "তুমি এখনই তোমার প্রোফাইল পিকচারে একটা পটেটো লাগাও ১ ঘণ্টার জন্য!", "নিজের নাম ব্যাকওয়ার্ডে বলো, ভিডিও করো!", "যাকে পছন্দ করো তাকে এখনই মেসেজ করো 'তুমি কিউট!'", "নিজের ভয়েসে গরুর ডাক দাও এবং পাঠাও!", "এখনই ১০টা পুশ-আপ দাও, প্রমাণ চাওয়া হলে ছবি পাঠাতে হবে!", "নিজের গলার আওয়াজে গান গেয়ে পাঠাও!", "একটা বাজে জোক বলো এবং নিজে হাসো!", "৫ বার 'আমি একটা আলু' বলো ভিডিও করে!", "নিজের প্রোফাইলে লিখো 'আমি একজন পাগল প্রেমিক' ১ ঘণ্টার জন্য!", "একটা শিশু কণ্ঠে ৩০ সেকেন্ড কথা বলো!", "একটা ফানি নাচ করো এবং ভিডিও পাঠাও!", "পাঁচটা প্রাণীর আওয়াজ অনুকরণ করো!", "তোমার ফোনের শেষ মেসেজটা এখানে কপি করে পাঠাও!", "কারো নাম ছাড়া তাকে রোমান্টিক মেসেজ পাঠাও!", "নিজের নাক দিয়ে কথা বলার চেষ্টা করো (মজা করে)", "একটা নতুন নাম দিয়ে নিজের পরিচয় দাও পরবর্তী ৩ বার!", "বাঁ হাত দিয়ে নিজের নাম লেখো এবং ছবি পাঠাও!", "তুমি এখনই একটি অদ্ভুত শব্দ বলো, যেমন 'চিচিং ফাঁক!'", "যে তোমার সামনেই বসে আছে (বা গ্রুপে), তাকে একটা কমপ্লিমেন্ট দাও!" ];

const choice = event.body.toLowerCase(); if (choice === "truth") { const truth = truths[Math.floor(Math.random() * truths.length)]; return api.sendMessage(🧠 Truth:\n${truth}, event.threadID); } else if (choice === "dare") { const dare = dares[Math.floor(Math.random() * dares.length)]; return api.sendMessage(🔥 Dare:\n${dare}, event.threadID); } else { return api.sendMessage("⚠️ রিপ্লাই দিন 'truth' অথবা 'dare' শুধু!", event.threadID); } };


