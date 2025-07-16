const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
 name: "bbn",
 version: "1.0.3",
 hasPermssion: 2,
 credits: "Shaon Ahmed",
 description: "ফাইল আপলোড করতে Dustbin API ব্যবহার করুন",
 commandCategory: "utility",
 usages: "[ফাইলনেম]",
 cooldowns: 15
};

module.exports.run = async function({ api, event, args }) {
 if (!args[0]) {
 return api.sendMessage("📁 ফাইলনের নাম লিখুন, উদাহরণ: bin test", event.threadID, event.messageID);
 }

 const fileName = args[0];
 const cmdPath = path.join(__dirname, "..", "commands");
 const possiblePaths = [
 path.join(cmdPath, fileName),
 path.join(cmdPath, `${fileName}.js`)
 ];

 const filePath = possiblePaths.find(fs.existsSync);

 if (!filePath) {
 return api.sendMessage("❌ ফাইল খুঁজে পাওয়া যায়নি!", event.threadID, event.messageID);
 }

 try {
 const fileContent = fs.readFileSync(filePath, "utf8");
 const uploadMsg = await api.sendMessage("📤 ফাইল আপলোড হচ্ছে...", event.threadID);

 try {
 // Dustbin API-তে রিকোয়েস্ট পাঠানো
 const response = await axios.post("http://141.11.167.247:6329/api/v1/pastes", {
 content: fileContent,
 syntax: "javascript",
 expire: "1h" // 1 ঘণ্টার জন্য স্টোর করবে
 }, {
 headers: { 
 "Content-Type": "application/json",
 "Authorization": "Bearer YOUR_API_KEY" // যদি প্রয়োজন হয়
 },
 timeout: 10000
 });

 await api.unsendMessage(uploadMsg.messageID);

 if (response.data && response.data.raw_url) {
 return api.sendMessage(`✅ সফলভাবে আপলোড হয়েছে!\n📝 Raw ফাইল: ${response.data.raw_url}`, event.threadID);
 } else if (response.data && response.data.url) {
 return api.sendMessage(`✅ সফলভাবে আপলোড হয়েছে!\n🔗 লিংক: ${response.data.url}`, event.threadID);
 }
 throw new Error("API রেসপন্সে URL পাওয়া যায়নি");
 
 } catch (apiError) {
 console.error("Dustbin API error:", apiError);
 await api.unsendMessage(uploadMsg.messageID);
 throw new Error(`ডাস্টবিন API ত্রুটি: ${apiError.message}`);
 }
 
 } catch (error) {
 console.error("Overall error:", error);
 return api.sendMessage(`❌ ত্রুটি: ${error.message}`, event.threadID, event.messageID);
 }
};
