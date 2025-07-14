const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ULLASH", //don't change my credit 
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    var time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    var callback = () => api.sendMessage({
        body: `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : 𝐚𝐬𝐡𝐢𝐤 & 𝐦𝐮𝐫𝐬𝐡𝐚𝐥𝐢𝐧 ッ
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐚𝐥𝐞
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : 𝐚𝐬𝐡𝐢𝐤 𝐦𝐚𝐫𝐫𝐢𝐞𝐝/𝐦𝐮𝐫𝐬𝐡𝐚𝐥𝐢𝐧 𝐬𝐢𝐧𝐠𝐥𝐞
┃ 🎂 𝐀𝐠𝐞       : 𝐚𝐬𝐡𝐢𝐤 16/𝐦𝐮𝐫𝐬𝐡𝐚𝐥𝐢𝐧 18+
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐬𝐥𝐚𝐦
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : 𝐬𝐞𝐜𝐫𝐞𝐭
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : c̶h̶a̶p̶r̶i̶ a̶p̶p̶ n̶o̶t̶ a̶l̶l̶o̶w̶
┃ 📢 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 : https://t.me/ashuu_xml_file
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : https://m.me/j/AbbtgPOtJtAnwqN8/
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🕒 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐓𝐢𝐦𝐞:  ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
  
    return request(encodeURI(`https://cdn.fbsbx.com/v/t59.2708-21/519363975_2356403754755911_4466089806778181355_n.gif?_nc_cat=101&ccb=1-7&_nc_sid=cf94fc&_nc_eui2=AeHcFm08LN68dr9Pwp4AKu56Rrgtbvuw269GuC1u-7Dbr1qa6Du_oREKFCHId0k83mSsZ2KSDFmCcSlpI-io7Dhh&_nc_ohc=xqbAkt8aVqcQ7kNvwHGv4rT&_nc_oc=AdkZlAT3yKIAsyj72i9C9WKnf0R0xYb3B-PukpHA4kXzY4Yq9BU0UpMknBWUWQUoFSI&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=xQJ_-SUOPFilu-tBcMhbvA&oh=03_Q7cD2wGMYNM6XA0YDSDQ9-Vmc17hi2vbETpNDuQdCyJOHmxflQ&oe=6876496F`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());
};
