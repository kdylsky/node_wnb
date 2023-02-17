const { Room, DetailRoom, Category, RoomImage } = require("../models");

module.exports.userShowRoom = async (req, res) => {
  const rooms = await Room.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "isCreatedAll"] },
    where: { isCreatedAll: true },
    include: [
      {
        model: RoomImage,
        attributes: ["roomImageUrl"],
      },
    ],
  });
  res.status(200).json(rooms);
};

module.exports.userRetriveRoom = async (req, res) => {
  const room = req.currentRetriveRoom;
  res.json(room);
};
