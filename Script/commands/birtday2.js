const axios = require("axios");

module.exports = {
  config: {
    name: "birthday",
    version: "1.0",
    credits: "Ashuu & ChatGPT",
    description: "🎂 জন্মদিন উইশ ছবি সহ",
    category: "fun",
    hasPermission: 0,
    usages: "[name]",
    cooldowns: 5
  },

  onStart: async function ({ event, args, message }) {
    const name = args.join(" ");
    if (!name) return message.reply("📌 উদাহরণ: /birthday Ashik");

    const wishes = [
      `🎉 শুভ জন্মদিন ${name}!\n\nতোমার হাসি চিরকাল থাকুক 🌟`,
      `🎂 ${name}, জন্মদিনে অফুরন্ত শুভেচ্ছা! 💖`,
      `🎊 শুভ জন্মদিন ${name}! আশা করি তোমার দিনটা অনেক সুন্দর যাবে 🎁`,
      `🥳 হ্যাপি বার্থডে ${name}! থাকো সুস্থ আর সুখী 💫`
    ];

    const images = [
      "https://i.imgur.com/U0V5z4r.jpg",
      "https://i.imgur.com/0Q9QfK1.jpg",
      "https://i.imgur.com/xAUzBrO.jpg",
      "https://i.imgur.com/nAXaG6w.jpg",
      "https://i.imgur.com/2TzDwEK.jpg"
    ];

    const wish = wishes[Math.floor(Math.random() * wishes.length)];
    const imgUrl = images[Math.floor(Math.random() * images.length)];

    try {
      const img = await axios.get(imgUrl, { responseType: "stream" });
      return message.reply({ body: wish, attachment: img.data });
    } catch (e) {
      return message.reply("❌ ছবি আনতে সমস্যা হয়েছে। শুধু টেক্সট পাঠানো হলো:\n\n" + wish);
    }
  }
};
