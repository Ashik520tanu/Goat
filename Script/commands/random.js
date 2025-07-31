module.exports.config = {
  'name': "random",
  'version': "11.9.7",
  'hasPermission': 0x0,
  'credits': "Shaon Ahmed",
  'description': "random love story video",
  'commandCategory': "video",
  'usages': "random",
  'cooldowns': 2
};
module.exports.run = async function ({
  api: _0x470481,
  event: _0x5e3610
}) {
  const _0x5b18a7 = require("axios");
  const _0x4d0726 = require("request");
  const _0xde4c6d = require('fs');
  const _0x5733e9 = await _0x5b18a7.get("https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json");
  const _0x4f2f26 = _0x5733e9.data.api;
  var _0x31a9e2 = [_0x4f2f26 + "/video/random"];
  var _0x3f4f43 = _0x31a9e2[Math.floor(Math.random() * _0x31a9e2.length)];
  _0x5b18a7.get(_0x3f4f43).then(_0x21f6f3 => {
    let _0x97279 = _0x21f6f3.data.count;
    let _0x20a507 = _0x21f6f3.data.name;
    let _0x261527 = function () {
      _0x470481.sendMessage({
        'body': "𝐑𝐀𝐍𝐃𝐎𝐌 𝐌𝐈𝐗 \nAdded by: [" + _0x20a507 + "]\n𝚃𝙾𝚃𝙰𝙻 𝚅𝙸𝙳𝙴𝙾:" + _0x97279 + "...🎬\n\n｢𝐢𝐭'𝐳 𝐃𝐞𝐯𝐢𝐥 𝐛𝐨𝐭|ᵃˢʰⁱᵏ｣",
        'attachment': _0xde4c6d.createReadStream(__dirname + "/cache/Shaoon.mp4")
      }, _0x5e3610.threadID, () => _0xde4c6d.unlinkSync(__dirname + "/cache/Shaoon.mp4"), _0x5e3610.messageID);
    };
    _0x4d0726(_0x21f6f3.data.url).pipe(_0xde4c6d.createWriteStream(__dirname + "/cache/Shaoon.mp4")).on("close", _0x261527);
  });
};
