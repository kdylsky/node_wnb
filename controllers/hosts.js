const { Host, User } = require("../models");

module.exports.showHostInfo = async (req, res) => {
  const user = req.user;
  const host = await Host.findOne({
    where: { userId: user.snsId },
  });
  res.status(200).json(host);
};

module.exports.createHost = async (req, res) => {
  const { hostImageUrl, hostImageFileName } = req.body;
  console.log(req.body);

  const host = await Host.create({
    userId: req.user.snsId,
    hostImageUrl: hostImageUrl,
    hostImageFileName: hostImageFileName,
  });
  res.status(200).json({ message: "호스트로 등록되었습니다." });
};
