module.exports.config = {
 name: "antiout",
  eventType: ["log:unsubscribe"],
   version: "0.0.1",
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
     description: "Listen events"
     };
module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
  if (data.antiout == false) return;
   if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
     const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
      if (type == "self-separation") {
        api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
           if (error) {
               api.sendMessage(`এই নলা এই গ্রুপে থাকার যোগ্য না \nতাই ${name} এই চুদির ভাই রে এড করলাম না \n\n ──────·····✦·····──── \n 𝐢𝐭'𝐳 𝐃𝐞𝐯𝐢𝐥 𝐛𝐨𝐭|ᵃˢʰⁱᵏ `, event.threadID)
                  } else api.sendMessage(`শোন, ${name} আবাল এই গ্রুপ হইলো গ্যাং! \n এখান থেকে যাইতে হইলে এডমিনের ক্লিয়ারেন্স লাগে! \nতুই পারমিশন ছাড়া লিভ নিছোস – তোকে আবার মাফিয়া স্টাইলে এড দিলাম। \n\n ── ·······✦·······──── \n 𝐢𝐭'𝐳 𝐃𝐞𝐯𝐢𝐥 𝐛𝐨𝐭|ᵃˢʰⁱᵏ `, event.threadID);
                    })
                     }
                     }
                     
