const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "Ocaption",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "hot nusu тШвя╕П_made byЁЦгШ -ashik & murshalinтЪая╕П_ тШвя╕П",
  description: "goicaption",
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

  var tl = ["সত্যিকারের ভালোবাসা যেমন বিরল..সত্যিকারের বন্ধুত্বও তেমন বিরল" , "গোপনীয়তা রক্ষা না করে চললে কোন বন্ধুত্ব টেকে না" , "আমার কাছে তারা শুধু বন্ধু নয় বরং তারা সব হৃদয়ের টুকরো" , "সত্যিকারের বন্ধুত্ব বাস্তব কবিতার মতো অত্যন্ত বিরল এবং মুক্তার মতো মূল্যবান" , "আমার বন্ধুরা আমার সাম্রাজ্য" , "আগলে কেউ রাখেনি কেউ রাখেও না..কত মানুষ থাকবে ভেবেও শেষ অবধি থাকে না", "কিছু মানুষের একাকিত্বের গল্প গুলো লুকিয়ে থাকে কিছু মিথ্যে হাসির আড়ালে" , "দেখলাম শুনলাম বুঝলাম এবার বেলা শেষে চুপ থাকলাম" , "আমি মানে সবার প্রয়োজন কারোও প্রিয়জন নই" , "আমার কাছে বেঁচে থাকাটা জীবন ভালো থাকাটা বিলাসিতা" , "হারিয়ে গেলে ক্ষতি কি?এই ব্যস্ত নগরীতে খুঁজে নেওয়ার মতো কেউ নাই" , "হবে না জীবনে কিছুই পাওয়া শুধু আর্তনাদ মিথ্যে চাওয়া" , "হেরে যাওয়া মানুষ..যারা জোকার সেজেই হাসে তারা ভেতরে ভেতরে গুমড়ে মরে..জীবন সার্কাসে" , "দুঃখ কখনো একা আসে না দল বেধে আসে" , "আমার জন্য তো তুমি যথেষ্ট ছিলে হয়তো তোমার জন্য আমি যথেষ্ট ছিলাম না" , "কিছু কষ্টের কোনো সমাধান থাকে না..সময়ের সাথে সাথে অভ্যাস হয়ে যায়" , "কারো কাছে মূল্যহীন হওয়ার চেয়ে..নিজের কাছে শূন্য থাকা শ্রেয়" , "বাস্তবতা হলো নতুন মানুষ পেলে পুরান মানুষের কদর কমে যায়" , "আমাকে ছাড়া তুমি ভালো থাকলেও দিন শেষে তোমাকে ছাড়া আমি চাইলেও ভালো থাকেত পারি না" , "মূল্যটা সবাই বোঝে তবে হারিয়ে যাবার পর" , "আগলে রাখতে শিখো প্রিয় জীবনে কিছু মানুষ বারবার আসে না" , "অভিমান হলো হৃদয়ের অতি গোপন প্রকোষ্ঠের ব্যাপার যে কেউ সেখানে হাত ছোঁয়াতে পারে না" , "অভিমানী মন অভিমানী এই রয়ে যায় তবুও কেউ অভিমান ভাঙাতে আসেনা" , "অভিমান করে যখন বলি তুমি আমাকে আর ফোন করবেনা কিন্তু ঠিকই মোবাইল হাতে নিয়ে তার ফোনের জন্য অপেক্ষা করার নামই ভালোবাসা" , "অভিমান খুব দামি একটা জিনিস..সবার উপর অভিমান করা যায় না শুধু ভালোবাসার মানুষ গুলোর উপরই অভিমান করা যায়" , "প্রতিবার তোমাকে ভুলতে চেয়ে যে কাজগুলো করি..তার তালিকাটা শুরু হয় তোমাকে আরো একবার কাছে ডাকার ইচ্ছে দিয়ে" , "নাই কোনো অভিমান অভিযোগ ভাল থাকুক সে" , "অভিমান শুধু ভালবাসা বাড়ায় না বিচ্ছেদও ঘটায়" , "অন্যের ওপরে অভিমান করে নিজেকে কষ্ট দেওয়া মানুষগুলি মারাত্মক বোকা" , "যখন মায়া বাড়িয়ে লাভ হয় না..তখন মায়া কাটাতে শিখতে হয়" , "প্রেম ভালোবাসা একটা অভিনয় আমরা সবাই অভিনেতা" , "যাকে মন থেকে অনেকটা আপন ভাবা হয় তার অবহেলা সহ্য করা সত্যি খুব কষ্টকর হয়" , "তুমি যদি কোনো লোককে জানতে চাও..তা হলে তাকে প্রথমে ভালোবাসতে শেখো","বন্ধুত্ব আমাদের আনন্দকে দ্বিগুণ করে এবং আমাদের দুঃখকে ভাগ করে সুখকে উন্নত করে এবং দুঃখকে হ্রাস করে" , "তুমি যদি কোনো লোককে জানতে চাও..তা হলে তাকে প্রথমে ভালোবাসতে শেখো" , " আমার কাছে তারা শুধু বন্ধু নয় বরং তারা সব হৃদয়ের টুকরো।" , "প্রেম ভালোবাসা একটা অভিনয় আমরা সবাই অভিনেতা" , "যখন মায়া বাড়িয়ে লাভ হয় না..তখন মায়া কাটাতে শিখতে হয়" , "অভিমান শুধু ভালবাসা বাড়ায় না বিচ্ছেদও ঘটায়" , "নাই কোনো অভিমান অভিযোগ ভাল থাকুক সে" , "প্রতিবার তোমাকে ভুলতে চেয়ে যে কাজগুলো করি..তার তালিকাটা শুরু হয় তোমাকে আরো একবার কাছে ডাকার ইচ্ছে দিয়ে","ভুল যেমনি মানুষকে শিখায়..তেমনি ভালোবাসা মানুষকে কাদায়" ,];
  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "MISS YOeueu") || (event.body.toLowerCase() == "misseveh you")) {
     return api.sendMessage("<ржЖржорж┐ рждрзЛржорж╛ржХрзЗ рж░рж╛ржЗрждрзЗ ржорж┐рж╕ ржЦрж╛ржЗЁЯе╣ЁЯдЦЁЯСЕ/ЁЯСЕ-тЬШ  ЁЯОА ЁЯНТ:))", threadID);
   };

    if ((event.body.toLowerCase() == "ЁЯШШsgsus") || (event.body.toLowerCase() == "ЁЯШsvsh╜")) {
     return api.sendMessage("ржХрж┐рж╕ ржжрж┐рж╕ ржирж╛ рждрзЛрж░ ржорзБржЦрзЗ ржжрзВрж░ ржЧржирзНржз ржХржпрж╝ржжрж┐ржи ржзрж░рзЗ ржжрж╛ржБржд ржмрзНрж░рж╛рж╢ ржХрж░рж┐рж╕ ржирж╛ржЗЁЯдм", threadID);
   };
   
    if ((event.body.toLowerCase() == "helpshsh") || (event.body.toLowerCase() == "helpshd")) {
     return api.sendMessage("type /help", threadID);
   };
  
   if ((event.body.toLowerCase() == "26 tdhsbn") || (event.body.toLowerCase() == "рзирзм рждрж╛ржxhisgv░рж┐ржЦ")) {
     return api.sendMessage("рзирзм рждрж╛рж░рж┐ржЦ.. ржПржЗ ржмрж┐рж╢рзЗрж╖ ржжрж┐ржирзЗ рж╢рзБржзрзБ ржЖржорж╛рж░ ржмрж╕ ржорзБрж░рж╕рж╛рж▓рж┐ржи ржирзЯ ржмрж░ржВ рж╕ржХрж▓ hsc ржЖржХрж╛ржЗржорзНржорж╛ ржжрзЗрж░ ржХрзБрж░ржмрж╛ржирж┐.. ржЕрж░рзНржерж╛рзО рж╕ржХрж▓рзЗ рж░рзЗржбрж┐ ржерж╛ржХржмрзЗржи..! ЁЯдгЁЯдЭ", threadID);
   };
  
   if ((event.body.toLowerCase() == "ржУржЗ ржХржdhdu┐рж░рзЗ") || (event.body.toLowerCase() == "oi kerayehru") ||(event.body.toLowerCase() == "...llsvy") || (event.body.toLowerCase() == "..vxug.")) {
     return api.sendMessage("ржоржзрзБ ржоржзрзБ рж░рж╕ржорж╛рж▓рж╛ржЗ ЁЯНЖтЫПя╕ПЁЯР╕ЁЯдг", threadID);
   };

   if ((event.body.toLowerCase() == "bcgddu") || (event.body.toLowerCase() == "dbdumc")) {
     return api.sendMessage("SAME TO YOUЁЯШК ", threadID);
   };

   if ((event.body.toLowerCase() == "ЁЯлжshsh") || (event.body.toLowerCase() == "ЁЯТЛdhdh")) {
     return api.sendMessage("ржХрж┐рж░рзЗ рж╣рж╛рж▓рж╛ рж▓рзБржЪрзНржЪрж╛, ржПржЧрзБрж▓рзЛ ржХрж┐ ржЗржорзБржЬрж┐ ржжрзЗрж╕ ред", threadID);
   };

   if ((event.body.toLowerCase() == "morning") || (event.body.toLowerCase() == "good morning")) {
     return api.sendMessage("মেঘলা আকাশ শীতল বাতাস..মেঘে ঢাকা মন..সবাই কে জানাই বৃষ্টি ভেজা.. সকালের অভিনন্দন..শুভ সকাল", threadID);
   };

   if ((event.body.toLowerCase() == "tordndjball") || (event.body.toLowerCase() == "babdidb")) {
     return api.sendMessage("~ рждрзЛржорж╛рж░ ржмрж╛рж▓ ржЙржарзЗ ржирж╛ржЗ ржирж╛ржХрж┐ рждрзЛржорж╛рж░?? ЁЯдЦ", threadID);
   };

  if ((event.body.toLowerCase() == "ashikddjj") || (event.body.toLowerCase() == "ashikshsihn") || (event.body.toLowerCase() == "@mohammadndohb ashik") || (event.body.toLowerCase() == "ржЖржnrdij╢рж┐ржХ")) {
     return api.sendMessage("ржЙржирж┐ ржПржЦржи ржХрж╛ржЬрзЗ ржмрж┐ржЬрж┐ ржЖржЫрзЗ ржХрж┐ ржмрж▓ржмрзЗржи ржЖржорж╛ржХрзЗ ржмрж▓рждрзЗ ржкрж╛рж░рзЗржи..!ЁЯШШ",threadID);

       
   };

   if ((event.body.toLowerCase() == "nddjowner") || (event.body.toLowerCase() == "ceonddjb")) {
     return api.sendMessage("тАО[ЁЭРОЁЭРЦЁЭРНЁЭРДЁЭРС:тШЮ ashik & murshalinуГГ тШЬ\nЁЭЪИЁЭЪШЁЭЪЮ ЁЭЩ▓ЁЭЪКЁЭЪЧ ЁЭЩ▓ЁЭЪКЁЭЪХЁЭЪХ them dad.\nЁЭРЗЁЭРвЁЭРм ЁЭРЕЁЭРЪЁЭРЬЁЭРЮЁЭРЫЁЭРиЁЭРиЁЭРд ЁЭРвЁЭРЭ :- https://m.me/j/AbbtgPOtJtAnwqN8/\nрждрж╛рж░ рж╕рж╛рждрзЗ ржпрзЛржЧрж╛ ржпрзЛржЧ ржХрж░ржмрзЗржи WhatsApp :- +0175570***", threadID);
   };

   if ((event.body.toLowerCase() == "Torndej boss ke") || (event.body.toLowerCase() == "adminnddj ke ")) {
     return api.sendMessage("My Creator:ashik & murshalin тЭдя╕П рж╣рж╛ржЗ ржЖржорж┐ ржорзЗржЫрзЗржирзНржЬрж╛рж░ ROBOT  ржЖрж╛ржорж╛рж░ ржмрж╕ ржЖржорж╛ржХрзЗ ржмрж╛ржирж┐рзЯрзЗржЫрзЗржи ржЖржкржирж╛ржжрзЗрж░ ржХрзЗ рж╣рж╛рж╕рж╛ржирзЛрж░ ржЬржирзНржп ржЖржорж┐ ржЪрж╛ржЗ ржЖржкржирж╛рж░рж╛ рж╕ржм рж╕ржорзЯ рж╣рж╛рж╕рж┐ ржЦрзБрж╢рж┐ ржерж╛ржХрзЗржи", threadID);
   };

  if ((event.body.toLowerCase() == "adminsbsj") || (event.body.toLowerCase() == "boterbdjj admin")) {
     return api.sendMessage("they are ashik & murshalin уГГтЭдя╕П рждрж╛ржХрзЗ рж╕ржмрж╛ржЗ ржбрзЗржнрж┐рж▓ ржирж╛ржорзЗ  ржЪрж┐ржирзЗЁЯдЩ", threadID);
   };

   if ((event.body.toLowerCase() == "bzjai") || (event.body.toLowerCase() == "bzjsbAi")) {
     return api.sendMessage("If you want to use the AI command, type /ai ", threadID);
   };

  
   if ((event.body.toLowerCase() == "chuphdhd") || (event.body.toLowerCase() == "stopbdjd") || (event.body.toLowerCase() == "ржЪрзБржкbdjdh ржХрж░") || (event.body.toLowerCase() == "chupnddjj kor")) {
     return api.sendMessage("рждрзБржЗ ржЪрзБржк ржЪрзБржк ржХрж░ ржкрж╛ржЧрж▓ ржЫрж╛ржЧрж▓", threadID);
   };

  if ((event.body.toLowerCase() == "ржЖdhdjh╕рж╛рж▓рж╛ржорзБ ржЖрж▓рж╛ржЗржХрзБржо") || (event.body.toLowerCase() == "Assalamualaikuxvzgwbk") || (event.body.toLowerCase() == "Assalamubnddjj alaikum") || (event.body.toLowerCase() == "Salambsbs ")) {
     return api.sendMessage("я╕П- ржУржпрж╝рж╛рж▓рж╛ржЗржХрзБржорзБрж╕-рж╕рж╛рж▓рж╛ржо-!!ЁЯЦд", threadID);
   };

   if ((event.body.toLowerCase() == "sala ami tdhsuv boss") || (event.body.toLowerCase() == "salzsshhami ullas") || (event.body.toLowerCase() == "cup sdxyhdb ami ullash") || (event.body.toLowerCase() == "madadhj")) {
     return api.sendMessage("рж╕рж░рж┐ ржмрж╕ ржорж╛ржл ржХрж░рзЗ ржжрзЗржи ржЖрж░ ржПржоржи ржнрзБрж▓ рж╣ржмрзЗ ржирж╛ЁЯе║ЁЯЩП", threadID);
   };

   if ((event.body.toLowerCase() == "@tanialddhh ta nu") || (event.body.toLowerCase() == "@tanialddhh ta nu")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржЖржЗржбрж╝рж┐ ржорзЗржирж╢ржи ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржЖрж╢рж┐ржХ ржПрж░ ржмржЙ ржПрж░ ржЖржЗржбрж╝рж┐ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

  if ((event.body.toLowerCase() == "tanidyskv") || (event.body.toLowerCase() == "tanialdgsb")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржирж╛ржо ржжрж░рзЗ ржбрж╛ржХ ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржЖрж╢рж┐ржХ ржПрж░ ржмржЙ ржПрж░ ржирж╛ржо..!ЁЯШаЁЯе░тЫПя╕П", threadID);
   };
  
  if ((event.body.toLowerCase() == "lokmanjrjrh") || (event.body.toLowerCase() == "lokmanetskv")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржирж╛ржо ржжрж░рзЗ ржбрж╛ржХ ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржорзБрж░рж╕рж╛рж▓рж┐ржи ржПрж░ ржмржирзНржзрзБ ржПрж░ ржирж╛ржо..!ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

  if ((event.body.toLowerCase() == "Alishamddjb") || (event.body.toLowerCase() == "alixughsha")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржирж╛ржо ржжрж░рзЗ ржбрж╛ржХ ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржЖрж╢рж┐ржХ ржПрж░ ржнрж╛ржмрж┐ ржПрж░ ржирж╛ржо..!ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

  if ((event.body.toLowerCase() == "tania tdbdsub nu") || (event.body.toLowerCase() == "tanialdsvshbb ta nu")) {
     return api.sendMessage("ржЦржмрж░ржжрж╛рж░ ржХрзЗржЙ ржПржЗ ржЖржЗржбрж╝рж┐ ржорзЗржирж╢ржи ржжрж┐ржмрж╛ржирж╛ ржПржЯрж╛ ржЖржорж╛рж░ ржмрж╕ ржЖрж╢рж┐ржХ ржПрж░ ржмржЙ ржПрж░ ржЖржЗржбрж╝рж┐ЁЯШаЁЯе░тЫПя╕П", threadID);
   };

   if ((event.body.toLowerCase() == "KISSddjjME") || (event.body.toLowerCase() == "kiss lddhdhme")) {
     return api.sendMessage("я╕П рждрзБржорж┐ ржкржБржЪрж╛ рждрзЛржорж╛ржХрзЗ ржХрж┐рж╕ ржжрж┐ржмрзЛ ржирж╛ ЁЯдн", threadID);
   };

   if ((event.body.toLowerCase() == "tnxjddh") || (event.body.toLowerCase() == "ржзрjddjжирзНржпржмрж╛ржж") || (event.body.toLowerCase() == "thankdjvzk you") || (event.body.toLowerCase() == "thanksbzjz")) {
     return api.sendMessage("я╕ПржПрждрзЛ ржзржирзНржпржмрж╛ржж ржирж╛ ржжрж┐ржпрж╝рзЗ ржкрж╛рж░рж▓рзЗ ржЧрж╛рж░рзНрж▓ржлрзНрж░рзЗржирзНржб ржЯрж╛ ржжрж┐ржпрж╝рзЗ ржжрзЗ..!ЁЯМЪтЫПя╕ПЁЯМ╢я╕П", threadID);
   };

   if ((event.body.toLowerCase() == "..fhvzv.") || (event.body.toLowerCase() == "..dhc") || (event.body.toLowerCase() == "ЁЯШdbb") || (event.body.toLowerCase() == "ЁЯдмshz") || (event.body.toLowerCase() == "hddЁЯШ╛")) {
     return api.sendMessage("я╕Прж░рж╛ржЧ ржХрж░рзЗ ржирж╛ рж╕рзЛржирж╛ ржкрж╛ржЦрж┐ ржПрждрзЛ рж░рж╛ржЧ рж╢рж░рзАрж░рзЗрж░ ржЬржирзНржп ржнрж╛рж▓рзЛ ржирж╛ЁЯе░", threadID);
   };

   if ((event.body.toLowerCase() == "рж╣рзБржоfdj") || (event.body.toLowerCase() == "xjHum")) {
     return api.sendMessage("я╕Прж╣рзБржо ржмрж▓рж┐ржУ ржирж╛ ржорж╛ржерж╛ ржПржоржирж┐рждрзЗржЗ ржЧрж░ржо ржЖржЫрзЗЁЯдмтЫПя╕ПЁЯШ╖", threadID);
   };

   if ((event.body.toLowerCase() == "Namdbdhb") || (event.body.toLowerCase() == "namezfb") || (event.body.toLowerCase() == "Tor nafivksb ki")) {
     return api.sendMessage("я╕ПMY NAME IS ┬░_>ЁЭЧЬЁЭШАЁЭЧ╣ЁЭЧоЁЭЧ║ЁЭЧ╢ЁЭЧ░ЁЭЧ╕ ЁЭЧ░ЁЭЧ╡ЁЭЧоЁЭШБ ЁЭЧпЁЭЧ╝ЁЭШБ", threadID);
   };

   if ((event.body.toLowerCase() == "BOTfhfjER BACCHA") || (event.body.toLowerCase() == "Bot ffjrxhn bacca")) {
     return api.sendMessage("я╕ПржЖржорж╛рж░ ржмрж╛ржЪрзНржЪрж╛ рждрзЛ рждрзЛржорж╛рж░ ржЧрж╛рж░рзНрж▓ржлрзНрж░рзЗржирзНржбрзЗрж░ ржкрзЗржЯрзЗ..!!ЁЯМЪтЫПя╕ПЁЯМ╢я╕П ", threadID);
   };

   if ((event.body.toLowerCase() == "murshalinnxdj") || (event.body.toLowerCase() == "ssdbdjdaw")) {
     return api.sendMessage("я╕ПржЙржирж┐ ржПржЦржи ржмрж┐ржЬрж┐ ржпрж╛ ржмрж▓рж╛рж░ ржЖржорж╛ржХрзЗ ржмрж▓рзБржи", threadID);
   };

   if ((event.body.toLowerCase() == "amifhdmurshalin") || (event.body.toLowerCase() == "edb")) {
     return api.sendMessage("я╕Прж╣рзНржпрж╛ржБ ржмрж╕ ржХрзЗржоржи ржЖржЫрзЗржи", threadID);
   };

   if ((event.body.toLowerCase() == "chudixbdb") || (event.body.toLowerCase() == "tor nanirdbdb xudi")) {
     return api.sendMessage("я╕ПржПржд ржЪрзЛржжрж╛ ржЪрзБржжрж┐ ржХрж░рж╕ ржХрзЗржирзЛ ржжрзЗржЦрж╛ ржпрж╛ржмрзЗ ржмрж╛рж╕рж░-рж░рж╛рждрзЗ-рждрзБржЗ-ржХрждрзЛ ржкрж╛рж░рж┐рж╕..!ЁЯе▒ЁЯМЭЁЯМЪтЫПя╕ПЁЯМ╢я╕П ", threadID);
   };

   if ((event.body.toLowerCase() == "ЁЯШddhj") || (event.body.toLowerCase() == "dbbcu..")) {
     return api.sendMessage("я╕ПржХрж┐ ржЧрзЛ ржХрж▓рж┐ржЬрж╛ рждрзЛржорж╛рж░ ржХрж┐ ржоржи ржЦрж╛рж░рж╛ржкЁЯе║", threadID);
   };
  
   if ((event.body.toLowerCase() == "ЁЯШТddb") || (event.body.toLowerCase() == "ЁЯЩdbd")) {
     return api.sendMessage("я╕П ржПржЗржжрж┐ржХрзЗ ржУржЗржжрж┐ржХрзЗ ржХрж┐ ржжрзЗржЦрзЛ ржЬрж╛ржирзБ ржЖржорж┐ рждрзЛржорж╛рж░ рж╕рж╛ржоржирзЗ ржжрзЗржЦрзЛЁЯШШ", threadID);
   };

   if ((event.body.toLowerCase() == "AMAKEvdjKEW VALOBASHE NA") || (event.body.toLowerCase() == "amakendh kew valobashe na") || (event.body.toLowerCase() == "Aj kew hxxhnai bole")) {
     return api.sendMessage("я╕ПржЪрж┐ржирзНрждрж╛ ржХрж░рзЛ ржХрзЗржи ржЖржорж┐ рждрзЛ ржЖржЫрж┐ЁЯл╢/nрждрзЛржорж╛ржХрзЗ рж░рж╛ржЗрждрзЗ ржнрж╛рж▓рзЛржмрж╛рж╕ржмрзЛ", threadID);
   };

   if ((event.body.toLowerCase() == "gfvtxj") || (event.body.toLowerCase() == "vibcgbf")) {
     return api.sendMessage("ржЦрж╛рж▓рж┐ ржХрж┐ рждрзЛрж░рж╛ржЗ ржкрзЗржо ржХрж░ржмрж┐ ржЖржорж╛ржХрзЗржУ ржПржХржЯрж╛ ржЧржл ржжрзЗ<ЁЯе║", threadID);
   };
   
   if ((event.body.toLowerCase() == "ЁЯШВsisvv") || (event.body.toLowerCase() == "ЁЯШБdbdb") || (event.body.toLowerCase() == "ЁЯШЖbddb") || (event.body.toLowerCase() == "ЁЯдгvxjd") || (event.body.toLowerCase() == "ЁЯШzjs╕") || (event.body.toLowerCase() == "ЁЯШhdhd╣")) {
     return api.sendMessage("ржнрж╛ржЗ рждрзБржЗ ржПржд рж╣рж╛рж╕рж┐рж╕ ржирж╛ рж╣рж╛рж╕рж▓рзЗ рждрзЛрж░ ржЙржкрж░рзЗ ржХрзНрж░рж╛рж╢ ржЦрж╛ржЗ..!ЁЯМЪЁЯШЪ", threadID);
   };

   if ((event.body.toLowerCase() == "ЁxhdЯе░") || (event.body.toLowerCase() == "ЁЯШНhdd") || (event.body.toLowerCase() == "ЁЯШdbdh╗") || (event.body.toLowerCase() == "тЭдяdhdh╕П")) {
     return api.sendMessage("ржнрж╛рж▓рзЛржмрж╛рж╕рж╛ ржирж╛ржоржХ ржЖржмрж▓рж╛ржорзА ржХрж░рждрзЗ ржЪрж╛ржЗрж▓рзЗ  ржЗржиржмржХрзНрж╕рзЗ ржЪрж▓рзЗ ржпрж╛ ржкрж╛ржЧрж▓ ржЫрж╛ржЧрж▓ЁЯМЪЁЯР╕ЁЯМ╢я╕ПЁЯНЖ", threadID);
   };

   if ((event.body.toLowerCase() == "ржХрзЗржоржиxdh ржЖржЫрзЛ") || (event.body.toLowerCase() == "ржХрзЗржоржиbbvv ржЖржЫрзЗржи") || (event.body.toLowerCase() == "Kmon hrjacho") || (event.body.toLowerCase() == "howdbdjare you") || (event.body.toLowerCase() == "how fhdvare you?")) {
     return api.sendMessage("ржЖржорж┐ рждржЦржиржЗ ржнрж╛рж▓рзЛ ржерж╛ржХрж┐ ржпржЦржи ржЖржкржирж╛ржХрзЗ рж╣рж╛рж╕рждрзЗ ржжрзЗржЦрж┐ЁЯдОтШ║я╕П", threadID);
   };

   if ((event.body.toLowerCase() == "mon shsjkharap") || (event.body.toLowerCase() == "tmr ki bzhmon kharap")) {
     return api.sendMessage("ржЖржорж╛рж░ рж╕рж╛ржжрж╛ ржоржирзЗ ржХрзЛржирзЛ ржХрж╛ржжрж╛ ржирж╛ржЗ...!ЁЯМЭ", threadID);
   };

   if ((event.body.toLowerCase() == "i lovedhd you") || (event.body.toLowerCase() == "Loveddj you") || (event.body.toLowerCase() == "I Lovehxj You") || (event.body.toLowerCase() == "ржнржdjj╛рж▓рзЛржмрж╛рж╕рж┐") || (event.body.toLowerCase() == "i love sjyou")) {
     return api.sendMessage("рж╕ржм ржорзБрждрж╛рж░ ржЬрж╛ржпрж╝ржЧрж╛ржпрж╝ ржЧрзБржБрждрж╛ ржжрзЗржУржпрж╝рж╛рж░ ржзрж╛ржирзНржжрж╛ ЁЯШкЁЯе▒", threadID);
   };

     if ((event.body.toLowerCase() == "bbjc by") || (event.body.toLowerCase() == "Byevfc") || (event.body.toLowerCase() == "jaigavgfcj") || (event.body.toLowerCase() == "ржмржvudv╛ржЗ") || (event.body.toLowerCase() == "pore kothadhd hbe") || (event.body.toLowerCase() == "ржпрж╛dhdjржЗ ржЧрж╛")) {
     return api.sendMessage("ржХрж┐рж░рзЗ рждрзБржЗ ржХржЗ ржпрж╛рж╕ ржХрзЛржи ржорзЗржпрж╝рзЗрж░ рж╕рж╛ржерзЗ ржЪрж┐ржкрж╛ржпрж╝ ржпрж╛ржмрж┐..!ЁЯМЪЁЯМ╢я╕ПЁЯНЖтЫПя╕П", threadID);
   };

   if ((event.body.toLowerCase() == "tumibxhd khaiso") || (event.body.toLowerCase() == "khaichobbzbs")) {
     return api.sendMessage("ржирж╛ ржЭрж╛ржВ ЁЯе╣ рждрзБржорж┐ рж░рж╛ржирзНржирж╛ ржХрж░рзЗ рж░рж╛ржЦрзЛ ржЖржорж┐ ржПрж╕рзЗ ржЦрж╛ржмрзЛ <ЁЯШШ", threadID);
   };

   if ((event.body.toLowerCase() == "tumi ki amakevvvshvs bhalobaso") || (event.body.toLowerCase() == "tmi ki amakezjsh vlo basho")) {
     return api.sendMessage("рж╣рзБржо ржЭрж╛ржВ ржЖржорж┐ рждрзЛржорж╛ржХрзЗ рж░рж╛ржЗрждрзЗ ржнрж▓рзЛржкрж╛рж╕рж┐ <ЁЯе╡", threadID);
   };

   if ((event.body.toLowerCase() == "ami djdhdashik") || (event.body.toLowerCase() == "kirevvv")) {
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
