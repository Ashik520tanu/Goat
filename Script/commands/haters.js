module.exports.config = {
  'name': "haters",
  'version': "1.0.0",
  'hasPermssion': 2,
  'credits': "ULLASH",
  'description': "haters কামলা মাগির ছেলেদের মায়রে গন ধর্ষণ করি ডিকোড কামলাদের মায়রে ২টাকা দামের কন্ডম দিয়া চুদি",
  'commandCategory': "Image",
  'usages': "haters vedio",
  'cooldowns': 0x5,
  'dependencies': {
    'request': '',
    'fs-extra': '',
    'axios': ''
  }
};
module.exports.run = async ({
  api: _0x4fc9c7,
  event: _0x334d8c,
  args: _0x5d7a39,
  client: _0x67b430,
  Users: _0x172cf0,
  Threads: _0xfb048e,
  __GLOBAL: _0x3cf3b8,
  Currencies: _0x12eede
}) => {
  const _0x22dc14 = global.nodemodule.request;
  const _0x38bb2b = global.nodemodule["fs-extra"];
  var _0x546df1 = ["👑—͟͟͞͞boss ashik 👑_এর haters দের জন্য"];
  var _0x316817 = _0x546df1[Math.floor(Math.random() * _0x546df1.length)];
  var _0x1f0f74 = ["https://i.imgur.com/rm09uEj.mp4", "https://i.imgur.com/NpqYepG.mp4", "https://i.imgur.com/Edanmmb.mp4", "https://i.imgur.com/93IUcmO.mp4"];
  var _0x3bb130 = () => _0x4fc9c7.sendMessage({
    'body': "「 " + _0x316817 + " 」",
    'attachment': _0x38bb2b.createReadStream(__dirname + "/cache/15.mp4")
  }, _0x334d8c.threadID, () => _0x38bb2b.unlinkSync(__dirname + "/cache/15.mp4"));
  return _0x22dc14(encodeURI(_0x1f0f74[Math.floor(Math.random() * _0x1f0f74.length)])).pipe(_0x38bb2b.createWriteStream(__dirname + "/cache/15.mp4")).on("close", () => _0x3bb130());
};
