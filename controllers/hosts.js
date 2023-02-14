const { Host, User, DetailUser } = require("../models");

module.exports.showHostInfo = async (req, res) => {
  const user = req.user;
  const host = await Host.findOne({
    where: { userId: user.snsId },
    attributes: { exclude: ["hostImageFileName", "createdAt", "updatedAt"] },
    include: [
      {
        model: User,
        attributes: ["email", "nickname"],
        include: [
          {
            model: DetailUser,
            attributes: ["firstName", "lastName", "phoneNumber"],
          },
        ],
      },
    ],
  });
  return res.status(200).json(host);
};

module.exports.createHost = async (req, res) => {
  await Host.create({
    userId: req.user.snsId,
    hostImageUrl: req.file.path,
    hostImageFileName: req.file.filename,
  });
  return res.status(200).json({ message: "호스트로 등록되었습니다." });
};
