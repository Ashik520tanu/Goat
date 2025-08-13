module.exports.config = {
 name: "hot",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "only ashuu",
 description: "RANDOM islamic video",
 commandCategory: "Random video",
 usages: "Statusvideo",
 cooldowns: 2,
 dependencies: {
 "request":"",
 "fs-extra":"",
 "axios":""
 }
 
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
 var link = [
"https://i.imgur.com/dBwIUBv.mp4",
"https://i.imgur.com/MVB7kpo.mp4",
"https://i.imgur.com/1lDSEUd.mp4",
"https://i.imgur.com/WmjePoP.mp4",
"https://i.imgur.com/BM6jdaK.mp4",
"https://i.imgur.com/iS96XHd.mp4",
"https://i.imgur.com/NCp2DVq.mp4",
"https://i.imgur.com/Jyhp3Xs.mp4",
"https://i.imgur.com/Fw5A8WG.mp4",
"https://i.imgur.com/bLUf5Tk.mp4",
"https://i.imgur.com/LchSjmI.mp4",
"https://i.imgur.com/Jjnw0ea.mp4",
"https://i.imgur.com/5ydQSyE.mp4",
"https://i.imgur.com/geOBX1V.mp4",
"https://i.imgur.com/7jNo5bv.mp4",
"https://i.imgur.com/ZAOcjqy.mp4",
"https://i.imgur.com/B1UN51M.mp4",
"https://i.imgur.com/ri6XnkS.mp4",
"https://i.imgur.com/kM1SgwW.mp4",
"https://i.imgur.com/BDns1JA.mp4",
"https://i.imgur.com/BDns1JA.mp4",
"https://i.imgur.com/kM1SgwW.mp4",
"https://i.imgur.com/ri6XnkS.mp4",
"https://i.imgur.com/B1UN51M.mp4",
"https://i.imgur.com/ZAOcjqy.mp4",
"https://i.imgur.com/ZAOcjqy.mp4",
"https://i.imgur.com/7jNo5bv.mp4",
"https://i.imgur.com/7jNo5bv.mp4",
"https://i.imgur.com/geOBX1V.mp4",
"https://i.imgur.com/geOBX1V.mp4",
"https://i.imgur.com/5ydQSyE.mp4",
"https://i.imgur.com/5ydQSyE.mp4",
"https://i.imgur.com/Jjnw0ea.mp4",
"https://i.imgur.com/LchSjmI.mp4",
 ];
 var callback = () => api.sendMessage({body:`ভিডিও দেখো আর হ্যান্ডেল মারো🥵`,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));
 return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
 };
