const fs = require("fs");
const path = require("path");

const cookieFile = path.join(__dirname, "fb_cookies.json");

// যদি ফাইল না থাকে, খালি JSON তৈরি করো
if (!fs.existsSync(cookieFile)) {
  fs.writeFileSync(cookieFile, "[]", "utf8");
}

module.exports.config = {
  name: "fbsession",
  version: "1.0.6",
  hasPermssion: 2,
  credits: "ashik",
  description: "Facebook session save & restore with change-detection auto-save (Lemur Browser)",
  commandCategory: "utility",
  usages: "/fbsession save",
  cooldowns: 3,
};

let lastCookiesHash = ""; // আগের কুকিজের অবস্থা ট্র্যাক করবে

// হ্যাশ জেনারেটর
function hashData(data) {
  return require("crypto").createHash("md5").update(JSON.stringify(data)).digest("hex");
}

module.exports.onLoad = async function ({ api }) {
  try {
    const cookies = JSON.parse(fs.readFileSync(cookieFile, "utf8"));
    if (cookies.length && api?.browser?.cookies) {
      for (const cookie of cookies) {
        await api.browser.cookies.set(cookie);
      }
      console.log("✅ Facebook কুকিজ অটো-লোড সম্পন্ন");
      lastCookiesHash = hashData(cookies);
    } else {
      console.log("⚠ কোন কুকিজ পাওয়া যায়নি বা Lemur Browser সমর্থন করছে না");
    }

    // প্রতি ৫ মিনিট পর কুকিজ সেভ (শুধু পরিবর্তিত হলে)
    if (api?.browser?.cookies) {
      setInterval(async () => {
        try {
          const currentCookies = await api.browser.cookies.getAll({});
          const currentHash = hashData(currentCookies);

          if (currentHash !== lastCookiesHash) {
            fs.writeFileSync(cookieFile, JSON.stringify(currentCookies, null, 2));
            lastCookiesHash = currentHash;
            console.log("💾 Auto-save: Facebook কুকিজ আপডেট হয়েছে");
          } else {
            console.log("ℹ কোন পরিবর্তন নেই, কুকিজ সেভ হয়নি");
          }
        } catch (err) {
          console.error("❌ Auto-save এ সমস্যা:", err.message);
        }
      }, 5 * 60 * 1000);
    }
  } catch (err) {
    console.error("❌ কুকিজ অটো-লোডে সমস্যা:", err.message);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const action = (args[0] || "").toLowerCase();

  if (!action || action !== "save") {
    return api.sendMessage("⚠ ব্যবহারঃ /fbsession save", event.threadID, event.messageID);
  }

  try {
    if (!api?.browser?.cookies) {
      return api.sendMessage("❌ Lemur Browser কুকিজ অ্যাক্সেস সমর্থন করছে না।", event.threadID, event.messageID);
    }

    const cookies = await api.browser.cookies.getAll({});
    const currentHash = hashData(cookies);

    if (currentHash !== lastCookiesHash) {
      fs.writeFileSync(cookieFile, JSON.stringify(cookies, null, 2));
      lastCookiesHash = currentHash;
      return api.sendMessage("✅ Facebook কুকিজ সফলভাবে সেভ হয়েছে!", event.threadID, event.messageID);
    } else {
      return api.sendMessage("ℹ কুকিজে কোন পরিবর্তন নেই, সেভ হয়নি।", event.threadID, event.messageID);
    }
  } catch (err) {
    return api.sendMessage("❌ সেভ করার সময় সমস্যা: " + err.message, event.threadID, event.messageID);
  }
};
