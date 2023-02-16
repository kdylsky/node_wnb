const { Host, User, DetailUser, Room } = require("../models");
const { HostCloudinary } = require("../cloudinary/hosts");

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

module.exports.updateHostInfo = async (req, res) => {
  const host = req.currentHost;
  const currentFileNmae = host.hostImageFileName;
  host.hostImageUrl = req.file.path;
  host.hostImageFileName = req.file.filename;
  await host.save();
  await HostCloudinary.uploader.destroy(currentFileNmae);
  return res.status(200).json({ message: "호스트 정보가 수정되었습니다." });
};

module.exports.showHostRooms = async (req, res) => {
  const rooms = await Room.findAll({
    where: { hostId: req.currentHost.userId },
  });
  return res.status(200).json(rooms);
};
