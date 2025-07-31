const users = {}; // userId অনুযায়ী পয়েন্ট ট্র্যাক করার জন্য

function getUserPoints(userId) {
  if (!users[userId] || users[userId].points <= 0) {
    users[userId] = { points: 20000 };
  }
  return users[userId].points;
}

function setUserPoints(userId, points) {
  users[userId] = { points };
}

function handleSpinCommand(userId, amount) {
  const currentPoints = getUserPoints(userId);

  if (isNaN(amount) || amount <= 0) {
    return `❌ দয়া করে একটি সঠিক পয়েন্ট সংখ্যা দিন। উদাহরণ: /spin 500`;
  }

  if (amount > currentPoints) {
    return `❌ আপনার কাছে পর্যাপ্ত পয়েন্ট নেই। আপনার পয়েন্ট: ${currentPoints}`;
  }

  const result = Math.random() < 0.5 ? 'lose' : 'win'; // 50% chance
  let newPoints;

  if (result === 'win') {
    newPoints = currentPoints + amount;
    setUserPoints(userId, newPoints);
    return `🎉 আপনি জিতেছেন! আপনার নতুন পয়েন্ট: ${newPoints}`;
  } else {
    newPoints = currentPoints - amount;
    setUserPoints(userId, newPoints);
    return `😢 আপনি হেরেছেন! আপনার নতুন পয়েন্ট: ${newPoints}`;
  }
}

function handleSpintkCommand(userId) {
  const points = getUserPoints(userId);
  return `💰 আপনার মোট পয়েন্ট: ${points}`;
}

module.exports = {
  name: "spin",
  description: "পয়েন্ট দিয়ে spin করুন",
  execute({ event, args }) {
    const userId = event.senderID;
    const amount = parseInt(args[0]);
    return handleSpinCommand(userId, amount);
  },
};

module.exports.spintk = {
  name: "spintk",
  description: "আপনার পয়েন্ট চেক করুন",
  execute({ event }) {
    const userId = event.senderID;
    return handleSpintkCommand(userId);
  },
};
