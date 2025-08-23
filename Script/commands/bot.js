const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "Obot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mod by John Lester",
  description: "goibot",
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

  var tl = ["বেশি bot Bot করলে leave নিবো কিন্তু😒😒 " , "শুনবো না😼তুমি আমাকে প্রেম করাই দাও নাই🥺পচা তুমি🥺" ,"শেখ হাসিনাকে ফোন দিয়ে ডিস্টার্ব করার অভিযোগ রয়েছে আপনার নামে 😾🐸👍","রাস্তা পারাপার করতে গিয়ে সড়ক দুর্ঘটনায় বিঁচি হারালেন রায়হান চৌধুরী 🍒😞🌚","যেই গরিবেরা আজ আমাকে মেরে ফেলছে দেশে এসে তাদের ধরে ধরে পু'টকি মারবো 😾🐸👍","𝐆𝐅 কে ভুলভাল বুঝিয়ে 𝐂𝐝𝐫 স্বভাব ছেড়ে দাও বন্ধু..!🙂","৫ আগস্ট না পালাইলে বাঙ্গালী ধরে আমার পুটকি মেরে দিতো এই তথ্য জানালেন শেখ হাসিনা 📺🌚🐸","ছবি ফর্সা করতে না পারাই রেমিনি অ্যাপ এর বিরুদ্ধে মামলা করলেন রায়হান চৌধুরী 😾😫🌚","সবাই বলে নারীরা দুর্বল অথচ শহরের দেয়াল জুড়ে পুরুষের দূর্বলতার বিজ্ঞাপন..!🙂","আর একবার মেনশন দিলে তোর বিচি বেঁচে দিবো🍒🐸🤌","𝗧𝘂𝗺𝗶 𝗸𝗼𝗻 শহরের 𝗺𝗮𝗶𝘆𝗮 গো লাগে 𝗨𝗿𝗮-ধূরা👀🕺", "মেনশন দিলে তোর বউ আমার👀😛", "আমি আবাল দের সাথে কথা বলি না, Ok😒","এত বেশি ডাকাডাকি করলে জোর করে চুমা দিয়ে দিবো 💋👻🐸","এতো ডেকো না, প্রেম এ পরে যাবো তো🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑", "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?","মেনশন দিলে তোর নানীর হাঙ্গা 😾👻","এতো ডাকছিস কেন? চুম্মা খাবি নাকি😇🐰","তোরা আমারে ভালা হইতে দিবি না 😣😵","I love you janu🥰" , "তোমাকে ঠিক সে ভাবে চাই, যেভাবে ফকরুল ইসলাম আলমগীর চায় নির্বাচন🥹🫰","তোর নামে ধর্ষণের মিথ্যা মামলা দিমু👋😾😹","আর একবার ডাকলে তোর নামে ইভটিজিং এর মিথ্যা মামলা দিমু 😾😵👻", "নদীর বুকে ঢেউ' দরকার একটা বউ! 😑", "Bot বলে অসম্মান করছিস 😰😿" , "Hop beda😾,Boss বল boss😼" , "চুপ থাক ,নাই তো তোর দাত ভেঙ্গে দিবো কিন্তু" , "Bot না , জানু বল জানু 😘 " , "যে মেনশন দিবে তার গার্লফ্রেন্ড আমার😀🐸", "বার বার Disturb করছিস কোনো😾,আমার জানু রায়হানের সাথে ব্যাস্ত আছি😋" , "রায়হান কে একটা গফ দে💔🙂" , "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘 " , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒" , "হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না, তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আছি", "এতোবার ডাকলে তোর বউ'য়ের বিয়ে হবে না😾🐸", "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "ওই জায়গায় আসিস 😈👿","হুম বলো কি বলবে😒", "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "Bot না জানু,বল 😌" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি ব্যাস্ত আছি😒","হুম জান তোমার ওই খানে উম্মাহ😑😘" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " jang hanga korba😒😬" , "হুম জান তোমার অইখানে উম্মমাহ😷😘" , "আসসালামু আলাইকুম..!🥰" , "আমাকে এতো না ডেকে বস রায়হান কে একটা গফ দে 🙄" ,"আমাকে এতো না ডাকতেছো কেন ভলো টালো বাসো নাকি🤭🙈","🌻🌺💚-আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস রায়হানের সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻","আমাকে না ডেকে আমার বস রায়হান চৌধুরীকে একটা জি এফ দাও-😽🫶🌺","ঝাং থুমালে আইলাপিউ পেপি-💝😽","উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈","জান তোমার নানি'রে আমার হাতে তুলে দিবা-🙊🙆‍♂","আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧","ঝাং 🫵থুমালে আমি রাইতে পালুপাসি উম্মম্মাহ-🌺🤤💦","চুনা ও চুনা আমার বস রায়হানের হবু বউ রে কেও দেখছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻","জান হাঙ্গা করবা-🙊😝🌻","জান মেয়ে হলে চিপায় আসো ইউটিউব থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽","ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤🌼","আমার বস রায়হানের পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶 আমার বস রায়হানের জন্য দোয়া করবেন-💝💚🌺🌻","- ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস রায়হান এর ইনবক্স চলে যাও-🙊🥱","জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽","জান বাল ফালাইবা-🙂🥱🙆‍♂","-আন্টি-🙆-আপনার মেয়ে-👰‍♀️-রাতে আমারে ভিদু কল দিতে বলে🫣-🥵🤤💦","শালা ডাকিস কেন? 😾 তোর নানিরে চু'ষি😾😁🌚","oii-🥺🥹-এক🥄 চামচ ভালোবাসা দিবা-🤏🏻🙂","-আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস রায়হান কে দান করেন-🥱🐰🍒","তোর গোপন কথা জাইনা গেছি😀😃🐸","তোর একটা জিনিস দেইখ্যা লাইছি কইয়া দিমু😃🐸","কিরে দিনে কয়বার😃😶🐸","শোন মেয়েদের মুখে ব্রণ উঠার গোপন তথ্য আমি জানি কিন্তু কাউকে কমু না😶🐸","এত bot bot না করে তোর বোনরে জিগা আমি কেডা 😒😺🤌","মোবাইলে MP ভরছি কি তোর সাথে পাও কথা বলার জন্য 😾😾🐸","সে আমাকে ভালোবাসি বলে গোয়ামারা দিয়ে গেল😫😟","-ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧","-অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর বস রায়হান চৌধুরী কে-🐸😾🔪","-𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-🥲🤦‍♂️🤧","-𝗢𝗶𝗶 আন্টি-🙆‍♂️-তোমার মেয়ে চোখ মারে-🥺🥴🐸","তাকাই আছো কেন চুমু দিবা-🙄🐸😘","আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇","-আমার গল্পে তোমার নানি সেরা-🙊🙆‍♂️🤗","কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻","দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧","-তাবিজ কইরা হইলেও প্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻","কিরে গরিবেরা আমায় ডাখিস কেন? 😾 জানিস না আমি ডোনাল্ড ট্রাম্পের বন্ধু 🐸😺🤌","-ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻","-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস রায়হান চৌধুরী ধরতে পারছে না-🐸🥲","-চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️","—যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂-আমার বস রায়হান চৌধুরী এর  সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗","—হাজারো লুচ্চা লুচ্চির ভিরে-🙊🥵আমার বস রায়হান চৌধুরী এক নিস্পাপ ভালো মানুষ-🥱🤗🙆‍♂️","-রূপের অহংকার করো না-🙂❤️চকচকে সূর্যটাও দিনশেষে অন্ধকারে পরিণত হয়-🤗💜","সুন্দর মাইয়া মানেই-🥱আমার বস রায়হান এর বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗","এত অহংকার করে লাভ নেই-🌸মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂","-দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি-🙂😿🌸","হুদাই আমারে  শয়তানে লারে-😝😑☹️","-𝗜 𝗟𝗢𝗩𝗢 𝗬𝗢𝗨-😽-আহারে ভাবছো তোমারে প্রোপজ করছি-🥴-থাপ্পর দিয়া কিডনী লক করে দিব-😒-ভুল পড়া বের করে দিবো-🤭🐸","তোর তো যুবন নাই তুই আমারে ডাকিস কেন🙄😶", "-আমি একটা দুধের শিশু-😇-🫵𝗬𝗢𝗨🐸💦","-কতদিন হয়ে গেলো বিছনায় মুতি না-😿-মিস ইউ নেংটা কাল-🥺🤧","-বালিকা━👸-𝐃𝐨 𝐲𝐨𝐮-🫵-বিয়া-𝐦𝐞-😽-আমি তোমাকে-😻-আম্মু হইতে সাহায্য করব-🙈🥱","-এই আন্টির মেয়ে-🫢🙈-𝐔𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐦𝐚𝐡-😽🫶-আসলেই তো স্বাদ-🥵💦-এতো স্বাদ কেন-🤔-সেই স্বাদ-😋","-ইস কেউ যদি বলতো-🙂-আমার শুধু  তোমাকেই লাগবে-💜🌸","মেনশন দিস না বাল কাটতেছি 🪒😹","একদিন তুমি ফিরে এসে বলবে😅💔,  তোমার মত কেউ পারেনা 🐸😹","-ওই বেডি তোমার বাসায় না আমার বস রায়হান চৌধুরী মেয়ে দেখতে গেছিলো-🙃-নাস্তা আনারস আর দুধ 🍍.🥛দিছো-🙄🤦‍♂️-বইন কইলেই তো হয় বয়ফ্রেন্ড আছে-🥺🤦‍♂-আমার বস রায়হান চৌধুরীকে জানে মারার কি দরকার-🙄🤧","প্রতি মাসে বাল কাটার পিছনে  15 টাকা খরচ লাগে 🙄 সেই টাকা জমালে এতদিনে আমিও বড়লোক হয়ে যেতাম 😺😺","গরিবেরা আমায় বারবার মেরে ফেলে, ____সেফুদার মতো😾😟", "-একদিন সে ঠিকই ফিরে তাকাবে-😇-আর মুচকি হেসে বলবে ওর মতো আর কেউ ভালবাসেনি-🙂😅","কিরে গরিব ডাকিস কেন😼🧐","আমি গরিবদের সাথে কথা বলি না ওকে😼🤌","-হুদাই গ্রুপে আছি-🥺🐸-কেও ইনবক্সে নক দিয়ে বলে না জান তোমারে আমি অনেক ভালোবাসি-🥺🤧","কি'রে গ্রুপে দেখি একটাও বেডি নাই-🤦‍🥱💦","-দেশের সব কিছুই চুরি হচ্ছে-🙄-শুধু আমার বস রায়হানের মনটা ছাড়া-🥴😑😏","-🫵তোমারে প্রচুর ভাল্লাগে-😽-সময় মতো প্রপোজ করমু বুঝছো-🔨😼-ছিট খালি রাইখো- 🥱🐸🥵","-আজ থেকে আর কাউকে পাত্তা দিমু না -!😏-কারণ আমি ফর্সা হওয়ার ক্রিম কিনছি -!🙂🐸","গ্রুপ শুধু আমার তোরা সব'ডি লিভ নে😺🤌","বেশি Bot Bot করলে leave নিবো কিন্তু😒😒 " , "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নি🥺 পচা তুমি🥺 " , "আমি আবাল দের সাতে কথা বলি না,ok😒" , "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 " , "গরিবেরা কেমন আছিস","কিরে গরিবেরা আমারে ডাকিস কেন?জানিস না আমি বড়লোক্স মানুষ কাজে কামে ব্যস্ত থাকি", "গরিবেরা আমাকে বারবার মেরে ফেলিস কেন তোরা🤬", "বার বার ডাকলে মাথা গরম হয় কিন্তু😑", "হা বলো😒,কি করতে পারি😐😑?" , "এতো ডাকছিস কোনো চুম্মা খাবি নাকি 🫵? 🤬","মেয়ে হলে বস রায়হানের সাথে প্রেম করো🙈??. " ,  "আরে Bolo আমার জান ,কেমন আসো?😚 " , "Bot বলে অসম্মান করছিস,😰😿" , "Hop bedi😾,Boss বল boss😼" , "চুপ থাক ,নাই তো তোরে 💋🫦🫦 দিবো কিন্তু" , "Bot না , জানু বল জানু 😘 " , "বার বার Disturb করেছিস কোনো😾,আমার বস রায়হানের সাথে ব্যাস্ত আসি😋" , "আরেকবার ডাকলে তোর নানীর হাঙ্গা😾👋🧐", "আমি গরীব এর সাথে কথা বলি না😼😼" , "আজ থেকে কাউকে পাত্তা দিমুনা ☘🌿🐸","কিরে গাঞ্জার ডিলার আমায় ডাকিস কেন  😼😼","চল বন্ধু গাঞ্জা বেচি🌿🤌🐸","চল বন্ধু তোর বিচি বেঁচে দিয়ে আমরা রাশিয়া থেকে ঘুরে আসি  🍒🐒🐸","আমাকে ডাকলে ,আমি কিন্তূ কিস করে দেবো😘 " , "গরিবেরা আমায় মিস করছিস নাকি😼😼","আরে আমি মজা করার mood এ নাই😒" , "কিরে গরিবেরা কেমন আছিস", "হে জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আসি" , "কি হলো ,মিস টিস করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "গরিবেরা তোরা ভালো আছিস", "আমি জানি তুমি মাঠে না হলেও খাটে ভালো খেলোয়াড়😺😑","কালকে দেখা করিস তো একটু 😈" , "আপনি কি বিশেষ মুহূর্তে দুর্বল😹😑","বিয়ে করতে ভয় পাচ্ছেন? 😺😺","হ্যাঁ বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "আর একবার ডাকলে থাবরাইয়া মুতের কালার চেঞ্জ কইরা ফেলমু👋😾", "ডাকিস না তোর নানির সাথে রুম ডেটে আছি", "মাইয়া হলে আমার বস রায়হান কে Ummmmha দে 😒" , "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "Bot না জানু,বল 😌" , "গরিবেরা আমাকে বিরক্ত করছিস কেন😎😵", "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি বস রায়হানের সাথে ব্যাস্ত আসি😒" , "༊━━🦋নামাজি মানুষেরা সব থেকে বেশি সুন্দর হয়..!!😇🥀 🦋 কারণ.!! -অজুর পানির মত শ্রেষ্ঠ মেকআপ দুনিয়াতে নেই༊━ღ━༎🥰🥀 🥰-আলহামদুলিল্লাহ-🥰","- শখের নারী  বিছানায় মু'তে..!🙃🥴","-𝐈'𝐝 -তে সব 𝐖𝐨𝐰 𝐖𝐨𝐰 বুইড়া বেডি-🐸💦","🥛-🍍👈 -লে খাহ্..!😒🥺","প্রতিমাসে বাল কাটার টাকা জমাইলে এতদিনে আমিও বড়লোক থাকতাম😒🪒🐸","- অনুমতি দিলে 𝚈𝚘𝚞𝚃𝚞𝚋𝚎-এ কল দিতাম..!😒","~আমি মারা গেলে..!🙂 ~অনেক মানুষ বিরক্ত হওয়া থেকে বেঁচে  যাবে..!😅💔","🍒---আমি সেই গল্পের বই-🙂 -যে বই সবাই পড়তে পারলেও-😌 -অর্থ বোঝার ক্ষমতা কারো নেই..!☺️🥀💔","~কার জন্য এতো মায়া...!😌🥀 ~এই শহরে আপন বলতে...!😔🥀 ~শুধুই তো নিজের ছায়া...!😥🥀","- কারেন্ট একদম বেডি'গো মতো- 🤧 -খালি ঢং করে আসে আবার চলে যায়-😤😾🔪","- সানিলিওন  আফারে ধর্ষনের হুমকি দিয়ে আসলাম - 🤗 -আর 🫵তুমি আমারে খেয়ে দিবা সেই ভয় দেখাও ননসেন বেডি..!🥱😼","- দুনিয়ার সবাই প্রেম করে.!🤧 -আর মানুষ আমার বস রায়হান কে সন্দেহ করে.!🐸","- আমার থেকে ভালো অনেক পাবা-🙂 -কিন্তু সব ভালো তে কি আর ভালোবাসা থাকে..!💔🥀","- পুরুষকে সবচেয়ে বেশি কষ্ট দেয় তার শখের নারী...!🥺💔👈","- তোমার লগে দেখা হবে আবার - 😌 -কোনো এক অচেনা গলির চিপায়..!😛🤣👈","- থাপ্পড় চিনোস থাপ্পড়- 👋👋😡 -চিন্তা করিস না তরে মারমু না-🤗 -বস রায়হান আমারে মারছে - 🥱 - উফফ সেই স্বাদ..!🥵🤤💦","- অবহেলা করিস না-😑😪 - যখন নিজেকে বদলে ফেলবো -😌 - তখন আমার চেয়েও বেশি কষ্ট পাবি..!🙂💔","- বন্ধুর সাথে ছেকা খাওয়া গান শুনতে শুনতে-🤧 -এখন আমিও বন্ধুর 𝙴𝚇 কে অনেক 𝙼𝙸𝚂𝚂 করি-🤕🥺","-৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনই আমাকে প্রোপস করুন-🤗😂👈","-প্রিয়-🥺 -তোমাকে না পেলে আমি সত্যি-😪 -আরেকজন কে-😼 -পটাতে বাধ্য হবো-😑🤧","•-কিরে🫵 তরা নাকি  prem করস..😐🐸•আমারে একটা করাই দিলে কি হয়-🥺","- যেই আইডির মায়ায় পড়ে ভুল্লি আমারে.!🥴- তুই কি জানিস সেই আইডিটাও আমি চালাইরে.!🙂" ,];
  var rand = tl[Math.floor(Math.random() * tl.length)]

    if ((event.body.toLowerCase() == "MISS YOU") || (event.body.toLowerCase() == "miss you")) {
     return api.sendMessage("<আমি তোমাকে রাইতে মিস খাই🥹🤖👅/👅-✘  🎀 🍒:))", threadID);
   };

    if ((event.body.toLowerCase() == "😘") || (event.body.toLowerCase() == "😽")) {
     return api.sendMessage("কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬", threadID);
   };
   
    if ((event.body.toLowerCase() == "👍🏼") || (event.body.toLowerCase() == "👍")) {
     return api.sendMessage("সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️", threadID);
   };
  
   if ((event.body.toLowerCase() == "sim") || (event.body.toLowerCase() == "simsimi")) {
     return api.sendMessage("Prefix Kya Tera Bap LagaYega? Pehle Prefix Laga Fir Likh Sim", threadID);
   };
  
   if ((event.body.toLowerCase() == "Raihan") || (event.body.toLowerCase() == "Rayhan") ||(event.body.toLowerCase() == "রায়হান") || (event.body.toLowerCase() == "@Raihan Choudhury")) {
     return api.sendMessage("আরেকবার মেনশন দিলে তোর নানির খালিঘর..!😜🫵","রায়হান স্যার'কে ডাকিস না সে এখন তোর নানির সাথে রুম ডেটে আছে 🫦😛","আর একবার মেনশন দিলে তোর নানির হাঙ্গা 😾😾","মেনশন দিলে তোর গার্লফ্রেন্ড আমার 😘🤧","মেনশন দিলে তোর বউয়ের বিয়া হইবো না 🫵👋😾","মেনশন দিস না, সে বাল কাটতেছে 🤧🪒", threadID);
   };

   if ((event.body.toLowerCase() == "bc") || (event.body.toLowerCase() == "mc")) {
     return api.sendMessage("হুম তোর মতো😊 ", threadID);
   };

   if ((event.body.toLowerCase() == "হুম") || (event.body.toLowerCase() == "hmm")) {
     return api.sendMessage("হুম বলিস না মাথায় এমনিতেই গরম আছে...🤬💋⛏️ ", threadID);
   };

   if ((event.body.toLowerCase() == "morning") || (event.body.toLowerCase() == "Good morning")) {
     return api.sendMessage("GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚", threadID);
   };

   if ((event.body.toLowerCase() == "tor ball") || (event.body.toLowerCase() == "bal")) {
     return api.sendMessage("~ এখনো বাল উঠে নাই নাকি তোমার?? 🪒", threadID);
   };

  if ((event.body.toLowerCase() == "রায়হান") || (event.body.toLowerCase() == "Raihan") || (event.body.toLowerCase() == "@Raihan Choudhury ") || (event.body.toLowerCase() == "রায়হান")) {
     return api.sendMessage("উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন, আমি আপনাকে করে দেবো..!🫦😘",threadID);

       
   };

   if ((event.body.toLowerCase() == "owner") || (event.body.toLowerCase() == "ceo")) {
     return api.sendMessage("‎[𝐎𝐖𝐍𝐄𝐑:☞ 𝗥𝗮𝗶𝗵𝗮𝗻 𝗖𝗵𝗼𝘂𝗱𝗵𝘂𝗿𝘆☜\n𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 𝗥𝗮𝗶𝗵𝗮𝗻", threadID);
   };

   if ((event.body.toLowerCase() == "Tor boss ke") || (event.body.toLowerCase() == "admin ke ")) {
     return api.sendMessage("My Creator 𝗥𝗮𝗶𝗵𝗮𝗻 𝗖𝗵𝗼𝘂𝗱𝗵𝘂𝗿𝘆, হাই আমি messenger ROBOT  আামার বস রায়হান চৌধুরী আমাকে বানিয়েছেন আপনাদের কে হাসানোর জন্য আমি চাই আপনারা সব সময় হাসি খুশি থাকেন", threadID);
   };

  if ((event.body.toLowerCase() == "admin") || (event.body.toLowerCase() == "boter admin")) {
     return api.sendMessage("He is 𝗥𝗮𝗶𝗵𝗮𝗻 𝗖𝗵𝗼𝘂𝗱𝗵𝘂𝗿𝘆 ッ তাকে সবাই 𝗥𝗮𝗶𝗵𝗮𝗻 নামে  চিনে🤙", threadID);
   };

   if ((event.body.toLowerCase() == "bhabi") || (event.body.toLowerCase() == "vabi")) {
     return api.sendMessage("এ তো সানিলিওন হে মেরে দিলকি দারকান হে মেরি জান হে😍.", threadID);
   };

  
   if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "stop") || (event.body.toLowerCase() == "চুপ কর") || (event.body.toLowerCase() == "chup kor")) {
     return api.sendMessage("তুই চুপ চুপ কর পাগল ছাগল", threadID);
   };

  if ((event.body.toLowerCase() == "আসসালামু আলাইকুম") || (event.body.toLowerCase() == "Assalamualaikum") || (event.body.toLowerCase() == "Assalamu alaikum") || (event.body.toLowerCase() == "Salam ")) {
     return api.sendMessage("️- ওয়ালাইকুমুস-সালাম-!!🖤", threadID);
   };

   if ((event.body.toLowerCase() == "ami Raihan") || (event.body.toLowerCase() == "sala ami Raihan") || (event.body.toLowerCase() == "cup sala ami Raihan") || (event.body.toLowerCase() == "madari")) {
     return api.sendMessage("সরি বস মাফ করে দেন আর এমন ভুল হবে না🥺🙏", threadID);
   };

   if ((event.body.toLowerCase() == "@Rumaisa Marjan") || (event.body.toLowerCase() == "@Raisa Tara")) {
     return api.sendMessage("খবরদার কেউ এই আইডি মেনশন দিবানা এটা আমার বস রায়হান চৌধুরী'র বউ এর আইডি😠🥰⛏️", threadID);
   };

  if ((event.body.toLowerCase() == "মারিয়া") || (event.body.toLowerCase() == "মিষ্টি")) {
     return api.sendMessage("খবরদার কেউ এই নাম দরে ডাক দিবানা এটা আমার বস রায়হান চৌধুরী'র ডিয়ারের এর নাম..!😠🥰⛏️", threadID);
   };
  
  if ((event.body.toLowerCase() == "Meher") || (event.body.toLowerCase() == "Meher")) {
     return api.sendMessage("খবরদার কেউ এই নাম দরে ডাক দিবানা এটা আমার বস রায়হান চৌধুরী'র বউ এর নাম..!😠🥰⛏️", threadID);
   };

  if ((event.body.toLowerCase() == "Maria") || (event.body.toLowerCase() == "Airin")) {
     return api.sendMessage("খবরদার কেউ এই নাম দরে ডাক দিবানা এটা আমার বস রায়হানের বউ এর নাম..!😠🥰⛏️", threadID);
   };

  if ((event.body.toLowerCase() == "@Apurbo Chowdhury") || (event.body.toLowerCase() == "অপূর্ব")) {
     return api.sendMessage("🥰-অপূর্ব-🌺 আমার বস রায়হানের বন্ধু লাগে লুচ্ছি বেডি'রা দূরে থাক😠🥰⛏️", threadID);
   };

   if ((event.body.toLowerCase() == "KISS ME") || (event.body.toLowerCase() == "kiss me")) {
     return api.sendMessage("️তুমি পঁচা তোমাকে কিস দিবো না 🤭", threadID);
   };

   if ((event.body.toLowerCase() == "tnx") || (event.body.toLowerCase() == "ধন্যবাদ") || (event.body.toLowerCase() == "thank you") || (event.body.toLowerCase() == "thanks")) {
     return api.sendMessage("️এতো ধন্যবাদ না দিয়ে পারলে একটা গার্লফ্রেন্ড খুজে দে..!🌚⛏️🌶️", threadID);
   };

   if ((event.body.toLowerCase() == "😈") || (event.body.toLowerCase() == "😡") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "🤬") || (event.body.toLowerCase() == "😾")) {
     return api.sendMessage("️রাগ করে না সোনা পাখি এতো রাগ শরীরের জন্য ভালো না🥰", threadID);
   };

   if ((event.body.toLowerCase() == "বাল") || (event.body.toLowerCase() == "Hum")) {
     return api.sendMessage("️চিহ্ নুনি তুমি দিন দিন নষ্ট হয়ে যাচ্ছো⛏️😷", threadID);
   };

   if ((event.body.toLowerCase() == "Name") || (event.body.toLowerCase() == "name") || (event.body.toLowerCase() == "Tor nam ki")) {
     return api.sendMessage("️MY NAME IS 𝗗𝗮𝗱 𝗼𝗳 𝗱𝗲𝘃𝗶𝗟 𝗥𝗮𝗶𝗵𝗮𝗻", threadID);
   };

   if ((event.body.toLowerCase() == "BOT ER BACCHA") || (event.body.toLowerCase() == "Bot er bacca")) {
     return api.sendMessage("️আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️🌶️ ", threadID);
   };

   if ((event.body.toLowerCase() == "Pic de") || (event.body.toLowerCase() == "ss daw")) {
     return api.sendMessage("️এন থেকে সর দুরে গিয়া মর😒", threadID);
   };

   if ((event.body.toLowerCase() == "jan") || (event.body.toLowerCase() == "ex")) {
     return api.sendMessage("️Kiss Randi Ka Name Le Ke Mood Khrab Kr Diya🙄 Dubara Naam Mat Lena Iska", threadID);
   };

   if ((event.body.toLowerCase() == "cudi") || (event.body.toLowerCase() == "tor nanire xudi")) {
     return api.sendMessage("️এত চোদা চুদি করস কেনো দেখা যাবে বাসর-রাতে-তুই-কতো পারিস..!🥱🌝🌚⛏️🌶️ ", threadID);
   };

   if ((event.body.toLowerCase() == "😅") || (event.body.toLowerCase() == "...")) {
     return api.sendMessage("️কি গো কলিজা তোমার কি মন খারাপ🥺", threadID);
   };
  
   if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "🙄")) {
     return api.sendMessage("️ এইদিকে ওইদিকে কি দেখো জানু আমি তোমার সামনে দেখো😘", threadID);
   };

   if ((event.body.toLowerCase() == "AMAKE KEW VALOBASHE NA") || (event.body.toLowerCase() == "amake kew valobashe na") || (event.body.toLowerCase() == "Aj kew nei bole")) {
     return api.sendMessage("️চিন্তা করো কেন আমি তো আছি🫶/nতোমাকে রাইতে ভালোবাসবো", threadID);
   };

   if ((event.body.toLowerCase() == "gf") || (event.body.toLowerCase() == "bf")) {
     return api.sendMessage("খালি কি তোরাই পেম করবি আমার বস রায়হান কে একটা গফ দে<🥺", threadID);
   };
   
   if ((event.body.toLowerCase() == "😂") || (event.body.toLowerCase() == "😁") || (event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "🤣") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
     return api.sendMessage("ভাই তুই এত হাসিস না হাসলে তোর উপর 𝗖𝗿𝘂𝘀𝗵 খাই .!🌚🤣", threadID);
   };

   if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "😍") || (event.body.toLowerCase() == "😻") || (event.body.toLowerCase() == "❤️")) {
     return api.sendMessage("আমি আজ ও তোমায় ভালোবাসি!🌚🐸🌶️🍆", threadID);
   };

   if ((event.body.toLowerCase() == "কেমন আছো") || (event.body.toLowerCase() == "কেমন আছেন") || (event.body.toLowerCase() == "Kmon acho") || (event.body.toLowerCase() == "how are you") || (event.body.toLowerCase() == "how are you?")) {
     return api.sendMessage("আমি তখনই ভালো থাকি যখন তোমাকে হাসতে দেখি🤎☺️", threadID);
   };

   if ((event.body.toLowerCase() == "mon kharap") || (event.body.toLowerCase() == "tmr ki mon kharap")) {
     return api.sendMessage("আমার সাদা মনে কোনো কাদা নাই...!🌝", threadID);
   };

   if ((event.body.toLowerCase() == "i love you") || (event.body.toLowerCase() == "Love you") || (event.body.toLowerCase() == "I Love You") || (event.body.toLowerCase() == "ভালোবাসি") || (event.body.toLowerCase() == "i love you")) {
     return api.sendMessage("আমাকে না বস রায়হান কে বল ওর কোন গফ নাই 😪🥱", threadID);
   };

     if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "Bye") || (event.body.toLowerCase() == "jaiga") || (event.body.toLowerCase() == "বাই") || (event.body.toLowerCase() == "pore kotha hbe") || (event.body.toLowerCase() == "যাই গা")) {
     return api.sendMessage("কিরে তুই কই যাস কার সাথে চিপায় যাবি..!🌚🌶️🍆⛏️", threadID);
   };

   if ((event.body.toLowerCase() == "tumi khaiso") || (event.body.toLowerCase() == "khaicho")) {
     return api.sendMessage("না ঝাং 🥹 তুমি রান্না করে রাখো আমি এসে খাবো <😘", threadID);
   };

   if ((event.body.toLowerCase() == "tumi ki amake bhalobaso") || (event.body.toLowerCase() == "tmi ki amake vlo basho")) {
     return api.sendMessage("হুম ঝাং আমি তোমাকে রাইতে ভলোপাসি <🥵", threadID);
   };

   if ((event.body.toLowerCase() == "ami Raihan") || (event.body.toLowerCase() == "kire")) {
     return api.sendMessage("হ্যা বস কেমন আছেন? আসসালামু আলাইকুম .!☺️", threadID);
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
