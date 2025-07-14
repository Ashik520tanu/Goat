module.exports.config = {
        name: "help",
        version: "1.0.2",
        hasPermssion: 2,
        credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
        description: "FREE SET-UP MESSENGER",
        commandCategory: "system",
        usages: "[Name module]",
        cooldowns: 5,
        envConfig: {
                autoUnsend: true,
                delayUnsend: 20
        }
};

module.exports.languages = {
 "en": {
    "moduleInfo": "╭──────•◈•──────╮\n |        devil bot ashik\n |●𝗡𝗮𝗺𝗲: •—» %1 «—•\n |●𝗨𝘀𝗮𝗴𝗲: %3\n |●𝗗𝗲𝘀𝗰𝗿𝗶p𝘁𝗶𝗼𝗻: %2\n |●𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n |●𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 seconds(s)\n |●𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n |𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆\n |•—» ashik ッ «—•\n╰──────•◈•──────╯",
    "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
    "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
 const { commands } = global.client;
 const { threadID, messageID, body } = event;

 if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
 const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
 if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const command = commands.get(splitBody[1].toLowerCase());
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
 return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs-extra");
 const { commands } = global.client;
 const { threadID, messageID } = event;
 const command = commands.get((args[0] || "").toLowerCase());
 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
if (args[0] == "all") {
    const command = commands.values();
    var group = [], msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `❄️ ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(' • ')}\n\n`);

    return axios.get('https://loidsenpaihelpapi.miraiandgoat.repl.co').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "61551846081032";

      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");
    let callback = function () {
        api.sendMessage({ body:`✿🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃✿\n\n` + msg + `✿══════════════✿\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : │ashik & murshalin ッ\n│𝗧𝗢𝗧𝗔𝗟 :  ${commands.size}\n————————————`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
        }, event.threadID, (err, info) => {
        fs.unlinkSync(__dirname + `/cache/472.${ext}`);
        if (autoUnsend == false) {
            setTimeout(() => {
                return api.unsendMessage(info.messageID);
            }, delayUnsend * 1000);
        }
        else return;
    }, event.messageID);
        }
         request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
     })
      })
};
 if (!command) {
  const arrayInfo = [];
  const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 15;
    let i = 0;
    let msg = "";

    for (var [name, value] of (commands)) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);  
const first = numberOfOnePage * page - numberOfOnePage;
   i = first;
   const helpView = arrayInfo.slice(first, first + numberOfOnePage);


   for (let cmds of helpView) msg += `•—»[ ${cmds} ]«—•\n`;
    const siu = `╭──────•◈•──────╮\n |        devil bot ashik \n |   🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃       \n╰──────•◈•──────╯`;
const text = `╭──────•◈•──────╮\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : │ ashik ッ\n│𝗧𝗢𝗧𝗔𝗟 : [${arrayInfo.length}]\n│📛🄿🄰🄶🄴📛 :  [${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)}]\n╰──────•◈•──────╯`; 
    var link = [
"https://i.imgur.com/a1mBcyO.jpeg", "https://i.imgur.com/pBVUKAz.jpeg", "https://i.imgur.com/w6k2fsq.jpeg", "https://cdn.fbsbx.com/v/t59.2708-21/519363975_2356403754755911_4466089806778181355_n.gif?_nc_cat=101&ccb=1-7&_nc_sid=cf94fc&_nc_eui2=AeHcFm08LN68dr9Pwp4AKu56Rrgtbvuw269GuC1u-7Dbr1qa6Du_oREKFCHId0k83mSsZ2KSDFmCcSlpI-io7Dhh&_nc_ohc=xqbAkt8aVqcQ7kNvwHGv4rT&_nc_oc=AdkZlAT3yKIAsyj72i9C9WKnf0R0xYb3B-PukpHA4kXzY4Yq9BU0UpMknBWUWQUoFSI&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=xQJ_-SUOPFilu-tBcMhbvA&oh=03_Q7cD2wGMYNM6XA0YDSDQ9-Vmc17hi2vbETpNDuQdCyJOHmxflQ&oe=6876496F",
"https://i.imgur.com/09NM0cL.jpeg",
"https://i.imgur.com/i3k5HpH.jpeg",
"https://i.imgur.com/mL1ngW5.jpeg",
    ]
     var callback = () => api.sendMessage({ body: siu + "\n\n" + msg  + text, attachment: fs.createReadStream(__dirname + "/cache/loidbutter.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/loidbutter.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => callback());
 }
const leiamname = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  var link = [
"https://cdn.fbsbx.com/v/t59.2708-21/519363975_2356403754755911_4466089806778181355_n.gif?_nc_cat=101&ccb=1-7&_nc_sid=cf94fc&_nc_eui2=AeHcFm08LN68dr9Pwp4AKu56Rrgtbvuw269GuC1u-7Dbr1qa6Du_oREKFCHId0k83mSsZ2KSDFmCcSlpI-io7Dhh&_nc_ohc=xqbAkt8aVqcQ7kNvwHGv4rT&_nc_oc=AdkZlAT3yKIAsyj72i9C9WKnf0R0xYb3B-PukpHA4kXzY4Yq9BU0UpMknBWUWQUoFSI&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=xQJ_-SUOPFilu-tBcMhbvA&oh=03_Q7cD2wGMYNM6XA0YDSDQ9-Vmc17hi2vbETpNDuQdCyJOHmxflQ&oe=6876496F",
  ]
    var callback = () => api.sendMessage({ body: leiamname, attachment: fs.createReadStream(__dirname + "/cache/loidbutter.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/loidbutter.jpg"), event.messageID);
return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => callback());
};
