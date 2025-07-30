module.exports = {
  config: {
    name: "spin",
    version: "1.0",
    author: "YourName",
    role: 0,
    shortDescription: "Spin to win or lose points",
    longDescription: "Spin a given point amount and win or lose randomly",
    category: "game",
    guide: {
      en: "/spin [amount] - spin with points\n/spintk - check your balance"
    }
  },

  onStart: async function () {
    global.userPoints = {}; // Store user balances
  },

  onChat: async function ({ event, message, args }) {
    const { threadID, senderID, body } = event;
    const command = body.trim().split(" ")[0].toLowerCase();

    if (!global.userPoints[senderID]) global.userPoints[senderID] = 20000;

    if (command === "/spintk") {return message.reply(`💰 Your current balance: ${global.userPoints[senderID]} points`);
    }

    if (command === "/spin") {
      const bet = parseInt(args[0]);
      if (isNaN(bet) || bet <= 0) return message.reply("❗ Please enter a valid point amount to spin.");
      if (bet > global.userPoints[senderID]) return message.reply("😢 You don't have enough points.");

      const win = Math.random() < 0.5;
      global.userPoints[senderID] += bet;
        message.reply(`🎉 You WON! +{bet} points!\n💰 New Balance: global.userPoints[senderID]`);
       else 
        global.userPoints[senderID] -= bet;
        if (global.userPoints[senderID] <= 0) 
          global.userPoints[senderID] = 20000;
          return message.reply("😢 You lost and your balance reached 0.🔁 Auto refill: 20000 points.");
        
        message.reply(`😔 You LOST! -{bet} points.\n💰 New Balance: ${global.userPoints[senderID]}`);
      }
    }
  }
};
