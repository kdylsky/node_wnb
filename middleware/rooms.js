const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { Room, DetailRoom, Address, RoomImage, Facility } = require("../models");

module.exports.existRoom = wrapAsync(async (req, res, next) => {
  const room = await Room.findOne({
    where: { id: req.params.room_id, isCreatedAll: true },
    include: [
      {
        model: DetailRoom,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      },
      {
        model: RoomImage,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      },
      {
        model: Address,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      },
      {
        model: Facility,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!room) {
    throw new ExpressError("[방] 방 정보를 확인해주세요");
  }
  req.currentRetriveRoom = room;
  next();
});
