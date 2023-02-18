const {
  Room,
  DetailRoom,
  Category,
  RoomImage,
  Facility,
  WishList,
} = require("../models");

const { faciltyList } = require("../utils/seedData");
const { Op } = require("sequelize");

module.exports.userShowRoom = async (req, res) => {
  const {
    categoryName,
    minPrice,
    maxPrice,
    bedroom,
    bathroom,
    capacity,
    facilities,
  } = req.query;
  const filter = {
    categoryName: categoryName || "한옥",
    minPrice: minPrice || 0,
    maxPrice: maxPrice || 1000000,
    bedroom: bedroom || 0,
    bathroom: bathroom || 0,
    capacity: capacity || 1,
    facilities: facilities || faciltyList,
  };
  const rooms = await Room.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "isCreatedAll"] },
    where: {
      isCreatedAll: true,
      price: {
        [Op.gte]: filter.minPrice,
        [Op.lte]: filter.maxPrice,
      },
    },
    include: [
      {
        model: Category,
        where: { categroyName: filter.categoryName },
      },
      {
        model: DetailRoom,
        where: {
          bedroom: {
            [Op.gte]: filter.bedroom,
          },
          bathroom: {
            [Op.gte]: filter.bathroom,
          },
          capacity: {
            [Op.gte]: filter.capacity,
          },
        },
      },
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

module.exports.userAddWishList = async (req, res) => {
  const room = req.currentRetriveRoom;
  const { wishListId } = req.body;
  const wishList = await WishList.findByPk(wishListId);
  wishList.addRooms(room);
  return res.status(200).json({ message: "위시리스트에 방이 추가되었습니다." });
};
