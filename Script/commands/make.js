const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "make",
  version: "2.3.0",
  hasPermssion: 0,
  credits: "ashik",
  description: "Generate AI image from prompt using Pallinations API",
  commandCategory: "image",
  usages: "/make [prompt] or /make rules",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const input = args.join(" ");

  // 📘 Show rules if user typed /make rules
  if (input.toLowerCase() === "rules") {
    const message = `
🖼️ 𝙈𝘼𝙆𝙀 - 𝙎𝙪𝙥𝙥𝙤𝙧𝙩𝙚𝙙 𝙎𝙩𝙮𝙡𝙚𝙨 & 𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙞𝙚𝙨:

🎨 Anime Character  
🧍‍♂️ Realistic Portrait  
🌆 Cyberpunk Scene  
🏞️ Nature / Landscape  
🕌 Islamic Calligraphy  
📖 Bengali Cartoon  
🎮 Game Character  
❤️ Love / Sad / Attitude  

✅ প্রতিটি প্রম্পট এ ১টি ছবি তৈরি হবে।
    `;
    return api.sendMessage(message.trim(), event.threadID, event.messageID);
  }

  // 🖼️ Generate image from prompt
  if (!input)
    return api.sendMessage("❌ অনুগ্রহ করে একটি প্রম্পট দিন যেমন:\n/make sad anime boy", event.threadID, event.messageID);

  const wait = await api.sendMessage("🔄 ছবি বানানো হচ্ছে, একটু অপেক্ষা করো...", event.threadID, event.messageID);

  try {
    const path = __dirname + `/cache/${event.senderID}_img.jpg`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(input)}`;
    const res = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(path, Buffer.from(res.data, "binary"));

    await api.sendMessage({
      body: `✅ তোমার ছবি তৈরি হয়েছে!`,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (err) {
    console.error("❌ Pallinations error:", err);
    api.sendMessage("❌ দুঃখিত, ছবি তৈরি করতে ব্যর্থ হয়েছে!", event.threadID, event.messageID);
  }
};
