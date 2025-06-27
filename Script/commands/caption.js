const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "Ocaption",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "hot nusu тШвя╕П_made byЁЦгШ -ashik & murshalinтЪая╕П_ тШвя╕П",
  description: "gocaption",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["            ,     ", "          ", "         ,     ", "         ", "             ", "          ", "                  ", "    , -   ;  ,     -      !", "    ,             ", "       ! -      !", "    ,              ", "      ,   ", "           ", "           ", "    ego satisfy  ", "     ", "        ", "       ", "         Cute  ", "     |", "Dear Ex        Choice   ", "         ", "         ", "          ", "      I don't care      ", "    ,        ", "                ", "           !", "       ", "          ", "   ...     ", "            ", "   ,   ,     ,    ", "            ", "      ,       !", "       ,          ", "    ,     ~", "   ,        ", "     ,       !", "          ", "          ", "        ", "   ,       ", "     ,       ,           ", "                    ,       ", "   ..     !  ,    ", "              " ,];
  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "MISS YOU CAPTION") || (event.body.toLowerCase() == "miss you caption")) {
     return api.sendMessage("           ", threadID);
   };

    if ((event.body.toLowerCase() == "fnd caption") || (event.body.toLowerCase() == "Fnd captioj")) {
     return api.sendMessage("    ,   ", threadID);
   };
   
    if ((event.body.toLowerCase() == "motivetional caption") || (event.body.toLowerCase() == "Motivetional caption")) {
     return api.sendMessage("   ,      ", threadID);
   };
  
   if ((event.body.toLowerCase() == "alone caption") || (event.body.toLowerCase() == "Alone caption")) {
     return api.sendMessage("          ", threadID);
   };
  
   if ((event.body.toLowerCase() == "attitude caption") || (event.body.toLowerCase() == "Attitude caption") ||(event.body.toLowerCase() == "ATTITUDE CAPTION") || (event.body.toLowerCase() == "Attitude Caption")) {
     return api.sendMessage("           ?" , threadID);
   };

   if ((event.body.toLowerCase() == "brekup caption") || (event.body.toLowerCase() == "Breakup caption")) {
     return api.sendMessage("-              " , threadID);
   };

   if ((event.body.toLowerCase() == "hardwork caption") || (event.body.toLowerCase() == "Hardwork caption")) {
     return api.sendMessage("            ", threadID);
   };

   if ((event.body.toLowerCase() == "morning") || (event.body.toLowerCase() == "good morning")) {
     return api.sendMessage("               " , threadID);
   };

   if ((event.body.toLowerCase() == "good night") || (event.body.toLowerCase() == "Gd night")) {
     return api.sendMessage("                    ",threadID);
   };

  if ((event.body.toLowerCase() == "ma") || (event.body.toLowerCase() == "Ammu") || (event.body.toLowerCase() == "mither") || (event.body.toLowerCase() == "ржЖрж╢рж┐ржХ")) {
     return api.sendMessage("    ,       ",threadID);

       
   };

   if ((event.body.toLowerCase() == "me") || (event.body.toLowerCase() == "Me")) {
     return api.sendMessage("   ,      ", threadID);
   };

   if ((event.body.toLowerCase() == "love") || (event.body.toLowerCase() == "Love")) {
     return api.sendMessage("           ", threadID);
   };

  if ((event.body.toLowerCase() == "sad") || (event.body.toLowerCase() == "Sad")) {
     return api.sendMessage("         ", threadID);
   };

   if ((event.body.toLowerCase() == "emotional") || (event.body.toLowerCase() == "Emotional")) {
     return api.sendMessage("        ", threadID);
   };

  
   if ((event.body.toLowerCase() == "old memorise") || (event.body.toLowerCase() == "Old memorise") || (event.body.toLowerCase() == " ") || (event.body.toLowerCase() == "")) {
     return api.sendMessage("     ", threadID);
   };

  if ((event.body.toLowerCase() == "sadness") || (event.body.toLowerCase() == "Sadness") || (event.body.toLowerCase() == "SADNESS") || (event.body.toLowerCase() == "Sad Ness")) {
     return api.sendMessage("হারানোর ভয় তো সেই বেশি পায় যে সত্যিকারে ভালোবাসে।", threadID);
   };

   if ((event.body.toLowerCase() == "success") || (event.body.toLowerCase() == "Success") || (event.body.toLowerCase() == "Success caption") || (event.body.toLowerCase() == "success caption")) {
     return api.sendMessage("সামনে এগিয়ে যাওয়ার নামই জীবন! খাওয়া আর ঘুমানোর নাম জীবন নয়।", threadID);
   };

   if ((event.body.toLowerCase() == "belive") || (event.body.toLowerCase() == "Belive")) {
     return api.sendMessage("যারা একবার বিশ্বাস ভঙ্গ করে, তাদের সুযোগ দিলে বার বার বিশ্বাস ভঙ্গ করে। মানুষ অতীত ভোলে না।", threadID);
   };

  if ((event.body.toLowerCase() == "mood off") || (event.body.toLowerCase() == "Mood off")) {
     return api.sendMessage("পারলাম না তোমাকে জড়াতে ভালোবাসার মায়ায়। তাই তো ইচ্ছেগুলো উড়িয়ে দিলাম নিকোটিনের বিষাক্ত কালো ধোঁয়ায়।", threadID);
   };
  
  if ((event.body.toLowerCase() == "lokmansvsvsv") || (event.body.toLowerCase() == "lokmanbdhdv")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржирж╛ржо ржжрж░рзЗ ржбрж╛ржХ ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржорзБрж░рж╕рж╛рж▓рж┐ржи ржПрж░ ржмржирзНржзрзБ ржПрж░ ржирж╛ржо..!ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

  if ((event.body.toLowerCase() == "Alishabshsh") || (event.body.toLowerCase() == "alishabsbsh")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржирж╛ржо ржжрж░рзЗ ржбрж╛ржХ ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржЖрж╢рж┐ржХ ржПрж░ ржнрж╛ржмрж┐ ржПрж░ ржирж╛ржо..!ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

  if ((event.body.toLowerCase() == "tania tehshhsv") || (event.body.toLowerCase() == "tania dhdhd nu")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржЖржЗржбрж╝рж┐ ржорзЗржирж╢ржи ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржЖрж╢рж┐ржХ ржПрж░ ржмржЙ ржПрж░ ржЖржЗржбрж╝рж┐ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

   if ((event.body.toLowerCase() == "KISS lshhshME") || (event.body.toLowerCase() == "kissvhdushme")) {
     return api.sendMessage("я╕П рждрзБржорж┐ ржкржБржЪрж╛ рждрзЛржорж╛ржХрзЗ ржХрж┐рж╕ ржжрж┐ржмрзЛ ржирж╛ ЁЯдн", threadID);
   };

   if ((event.body.toLowerCase() == "tnx") || (event.body.toLowerCase() == "ржзржирзНржпржмрж╛ржж") || (event.body.toLowerCase() == "thankvhvyou") || (event.body.toLowerCase() == "thanksvvg")) {
     return api.sendMessage("я╕ПржПрждрзЛ ржзржирзНржпржмрж╛ржж ржирж╛ ржжрж┐ржпрж╝рзЗ ржкрж╛рж░рж▓рзЗ ржЧрж╛рж░рзНрж▓ржлрзНрж░рзЗржирзНржб ржЯрж╛ ржжрж┐ржпрж╝рзЗ ржжрзЗ..!ЁЯМЪтЫПя╕ПЁЯМ╢я╕П", threadID);
   };

   if ((event.body.toLowerCase() == "...bxh.") || (event.body.toLowerCase() == ".bvvc..") || (event.body.toLowerCase() == "ЁЯШаguttvczZv") || (event.body.toLowerCase() == "ЁЯдмgfcj") || (event.body.toLowerCase() == "ЁЯШvffc╛")) {
     return api.sendMessage("я╕Прж░рж╛ржЧ ржХрж░рзЗ ржирж╛ рж╕рзЛржирж╛ ржкрж╛ржЦрж┐ ржПрждрзЛ рж░рж╛ржЧ рж╢рж░рзАрж░рзЗрж░ ржЬржирзНржп ржнрж╛рж▓рзЛ ржирж╛ЁЯе░", threadID);
   };

   if ((event.body.toLowerCase() == "рж╣рзБржоbddh") || (event.body.toLowerCase() == "Humddhh")) {
     return api.sendMessage("я╕Прж╣рзБржо ржмрж▓рж┐ржУ ржирж╛ ржорж╛ржерж╛ ржПржоржирж┐рждрзЗржЗ ржЧрж░ржо ржЖржЫрзЗЁЯдмтЫПя╕ПЁЯШ╖", threadID);
   };

   if ((event.body.toLowerCase() == "Namebdh") || (event.body.toLowerCase() == "namebbdj") || (event.body.toLowerCase() == "Torbbrh nam ki")) {
     return api.sendMessage("я╕ПMY NAME IS ┬░_>ЁЭЧЬЁЭШАЁЭЧ╣ЁЭЧоЁЭЧ║ЁЭЧ╢ЁЭЧ░ЁЭЧ╕ ЁЭЧ░ЁЭЧ╡ЁЭЧоЁЭШБ ЁЭЧпЁЭЧ╝ЁЭШБ", threadID);
   };

   if ((event.body.toLowerCase() == "BOT ER BACCHAbbeeh") || (event.body.toLowerCase() == "Bot er baccabbdhd")) {
     return api.sendMessage("я╕ПржЖржорж╛рж░ ржмрж╛ржЪрзНржЪрж╛ рждрзЛ рждрзЛржорж╛рж░ ржЧрж╛рж░рзНрж▓ржлрзНрж░рзЗржирзНржбрзЗрж░ ржкрзЗржЯрзЗ..!!ЁЯМЪтЫПя╕ПЁЯМ╢я╕П ", threadID);
   };

   if ((event.body.toLowerCase() == "murshalinbdudj") || (event.body.toLowerCase() == "ss dawbbddh")) {
     return api.sendMessage("я╕ПржЙржирж┐ ржПржЦржи ржмрж┐ржЬрж┐ ржпрж╛ ржмрж▓рж╛рж░ ржЖржорж╛ржХрзЗ ржмрж▓рзБржи", threadID);
   };

   if ((event.body.toLowerCase() == "ami bdudbmurshalin") || (event.body.toLowerCase() == "exdudh")) {
     return api.sendMessage("я╕Прж╣рзНржпрж╛ржБ ржмрж╕ ржХрзЗржоржи ржЖржЫрзЗржи", threadID);
   };

   if ((event.body.toLowerCase() == "chudivvvcc") || (event.body.toLowerCase() == "tor nanireghgzus xudi")) {
     return api.sendMessage("я╕ПржПржд ржЪрзЛржжрж╛ ржЪрзБржжрж┐ ржХрж░рж╕ ржХрзЗржирзЛ ржжрзЗржЦрж╛ ржпрж╛ржмрзЗ ржмрж╛рж╕рж░-рж░рж╛рждрзЗ-рждрзБржЗ-ржХрждрзЛ ржкрж╛рж░рж┐рж╕..!ЁЯе▒ЁЯМЭЁЯМЪтЫПя╕ПЁЯМ╢я╕П ", threadID);
   };

   if ((event.body.toLowerCase() == "vehvЁЯШЕ") || (event.body.toLowerCase() == ".vhv..")) {
     return api.sendMessage("я╕ПржХрж┐ ржЧрзЛ ржХрж▓рж┐ржЬрж╛ рждрзЛржорж╛рж░ ржХрж┐ ржоржи ржЦрж╛рж░рж╛ржкЁЯе║", threadID);
   };
  
   if ((event.body.toLowerCase() == "ЁЯШТvusbb") || (event.body.toLowerCase() == "ЁЯЩДsvsvs")) {
     return api.sendMessage("я╕П ржПржЗржжрж┐ржХрзЗ ржУржЗржжрж┐ржХрзЗ ржХрж┐ ржжрзЗржЦрзЛ ржЬрж╛ржирзБ ржЖржорж┐ рждрзЛржорж╛рж░ рж╕рж╛ржоржирзЗ ржжрзЗржЦрзЛЁЯШШ", threadID);
   };

   if ((event.body.toLowerCase() == "AMAKE KEWvhgvv VALOBASHE NA") || (event.body.toLowerCase() == "amake kewvhjkv valobashe na") || (event.body.toLowerCase() == "Aj kewvhhbxc nai bole")) {
     return api.sendMessage("я╕ПржЪрж┐ржирзНрждрж╛ ржХрж░рзЛ ржХрзЗржи ржЖржорж┐ рждрзЛ ржЖржЫрж┐ЁЯл╢/nрждрзЛржорж╛ржХрзЗ рж░рж╛ржЗрждрзЗ ржнрж╛рж▓рзЛржмрж╛рж╕ржмрзЛ", threadID);
   };

   if ((event.body.toLowerCase() == "gfcyc") || (event.body.toLowerCase() == "cggcbf")) {
     return api.sendMessage("ржЦрж╛рж▓рж┐ ржХрж┐ рждрзЛрж░рж╛ржЗ ржкрзЗржо ржХрж░ржмрж┐ ржЖржорж╛ржХрзЗржУ ржПржХржЯрж╛ ржЧржл ржжрзЗ<ЁЯе║", threadID);
   };
   
   if ((event.body.toLowerCase() == "ЁЯШВvggv") || (event.body.toLowerCase() == "ЁЯШБvgvg") || (event.body.toLowerCase() == "ЁЯШЖvuvv") || (event.body.toLowerCase() == "fyhЁЯдг") || (event.body.toLowerCase() == "ЁЯШccib╕") || (event.body.toLowerCase() == "ЁЯШvchc╣")) {
     return api.sendMessage("ржнрж╛ржЗ рждрзБржЗ ржПржд рж╣рж╛рж╕рж┐рж╕ ржирж╛ рж╣рж╛рж╕рж▓рзЗ рждрзЛрж░ ржЙржкрж░рзЗ ржХрзНрж░рж╛рж╢ ржЦрж╛ржЗ..!ЁЯМЪЁЯШЪ", threadID);
   };

   if ((event.body.toLowerCase() == "ЁЯе░") || (event.body.toLowerCase() == "ЁЯШНvauvv") || (event.body.toLowerCase() == "ЁЯШhcuub╗") || (event.body.toLowerCase() == "тЭдяfff jj╕П")) {
     return api.sendMessage("ржнрж╛рж▓рзЛржмрж╛рж╕рж╛ ржирж╛ржоржХ ржЖржмрж▓рж╛ржорзА ржХрж░рждрзЗ ржЪрж╛ржЗрж▓рзЗ  ржЗржиржмржХрзНрж╕рзЗ ржЪрж▓рзЗ ржпрж╛ ржкрж╛ржЧрж▓ ржЫрж╛ржЧрж▓ЁЯМЪЁЯР╕ЁЯМ╢я╕ПЁЯНЖ", threadID);
   };

   if ((event.body.toLowerCase() == "ржХрзЗржоржиggsgsg  ржЖржЫрзЛ") || (event.body.toLowerCase() == "ржХрзЗржоржиvsbhsb ржЖржЫрзЗржи") || (event.body.toLowerCase() == "Kmon acho") || (event.body.toLowerCase() == "how are you") || (event.body.toLowerCase() == "how are you?")) {
     return api.sendMessage("ржЖржорж┐ рждржЦржиржЗ ржнрж╛рж▓рзЛ ржерж╛ржХрж┐ ржпржЦржи ржЖржкржирж╛ржХрзЗ рж╣рж╛рж╕рждрзЗ ржжрзЗржЦрж┐ЁЯдОтШ║я╕П", threadID);
   };

   if ((event.body.toLowerCase() == "mon kharsfysc") || (event.body.toLowerCase() == "tmr ki shhdidb kharap")) {
     return api.sendMessage("ржЖржорж╛рж░ рж╕рж╛ржжрж╛ ржоржирзЗ ржХрзЛржирзЛ ржХрж╛ржжрж╛ ржирж╛ржЗ...!ЁЯМЭ", threadID);
   };

   if ((event.body.toLowerCase() == "i love you") || (event.body.toLowerCase() == "Love you") || (event.body.toLowerCase() == "I LovedhywfcjuYou") || (event.body.toLowerCase() == "ржнржdusvj cj╛рж▓рзЛржмрж╛рж╕рж┐") || (event.body.toLowerCase() == "i love yodfsuc")) {
     return api.sendMessage("рж╕ржм ржорзБрждрж╛рж░ ржЬрж╛ржпрж╝ржЧрж╛ржпрж╝ ржЧрзБржБрждрж╛ ржжрзЗржУржпрж╝рж╛рж░ ржзрж╛ржирзНржжрж╛ ЁЯШкЁЯе▒", threadID);
   };

     if ((event.body.toLowerCase() == "sxyyj e kye") || (event.body.toLowerCase() == "Bdveih") || (event.body.toLowerCase() == "jaigedvudn") || (event.body.toLowerCase() == "ржмржbbsh╛ржЗ") || (event.body.toLowerCase() == "pore kothavvshidibhbe") || (event.body.toLowerCase() == "ржпржusvob╛ржЗ ржЧрж╛")) {
     return api.sendMessage("ржХрж┐рж░рзЗ рждрзБржЗ ржХржЗ ржпрж╛рж╕ ржХрзЛржи ржорзЗржпрж╝рзЗрж░ рж╕рж╛ржерзЗ ржЪрж┐ржкрж╛ржпрж╝ ржпрж╛ржмрж┐..!ЁЯМЪЁЯМ╢я╕ПЁЯНЖтЫПя╕П", threadID);
   };

   if ((event.body.toLowerCase() == "tumi khaegsvj") || (event.body.toLowerCase() == "khaicsvsvs")) {
     return api.sendMessage("ржирж╛ ржЭрж╛ржВ ЁЯе╣ рждрзБржорж┐ рж░рж╛ржирзНржирж╛ ржХрж░рзЗ рж░рж╛ржЦрзЛ ржЖржорж┐ ржПрж╕рзЗ ржЦрж╛ржмрзЛ <ЁЯШШ", threadID);
   };

   if ((event.body.toLowerCase() == "tumi kimakevveve bhalobaso") || (event.body.toLowerCase() == "tmi  ama vlovsbsb basho")) {
     return api.sendMessage("рж╣рзБржо ржЭрж╛ржВ ржЖржорж┐ рждрзЛржорж╛ржХрзЗ рж░рж╛ржЗрждрзЗ ржнрж▓рзЛржкрж╛рж╕рж┐ <ЁЯе╡", threadID);
   };

   if ((event.body.toLowerCase() == "ami hdhdhashik") || (event.body.toLowerCase() == "kiresccw")) {
     return api.sendMessage("рж╣рзНржпрж╛ ржмрж╕ ржХрзЗржоржи ржЖржЫрзЗржи..?тШ║я╕П", threadID);
   };
  mess = "{name}"
  
  if (event.body.indexOf("Bot") == 0 || (event.body.indexOf("bot") == 0)) {
    var msg = {
      body: `${name}, ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
