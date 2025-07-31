module.exports.config: {
    name: "reactDelete",
    version: "1.0.0",
    author: "ashuu",
    haspermission: 0,
    shortDescription: "Delete message on 👍 reaction",
    CommandCategory: "system",
  },

  onReaction: async function ({ api, event }) {
    const { messageID, userID, reaction } = event;

    if (reaction === '👍') {
      try {
        await api.unsendMessage(messageID);
      } catch (err) {
        console.log("❌ Failed to delete message:", err);
      };
