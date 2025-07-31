module.exports.config = {
  name: "mention",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ChatGPT",
  description: "কারো মেনশন বার বার করবে",
  commandCategory: "utility",
  usages: "@mention [amount]",
  cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
  const mentions = Object.keys(event.mentions);
  const amount = parseInt(args[args.length - 1]);

  if (mentions.length === 0) {
    return api.sendMessage("❌ আপনি কাউকে মেনশন করেননি।", event.threadID, event.messageID);
  }

  if (isNaN(amount) || amount <= 0) {
    return api.sendMessage("❌ অনুগ্রহ করে একটি সঠিক সংখ্যা দিন। যেমন: /mention @someone 5", event.threadID, event.messageID);
  }

  const tagID = mentions[0];
  const tagName = event.mentions[tagID];
  const tagObject = [{ id: tagID, tag: tagName }];

  let messages = "";
  for (let i = 0; i < amount; i++) {
    messages += `${tagName} \n`;
  }

  return api.sendMessage({
    body: messages.trim(),
    mentions: Array(amount).fill({ id: tagID, tag: tagName })
  }, event.threadID, event.messageID);
};
