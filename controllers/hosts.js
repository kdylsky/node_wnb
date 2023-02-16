require("dotenv").config();
const env = process.env;

const ExpressError = require("../utils/ExpressError");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapBoxToken = env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const {
  Host,
  User,
  DetailUser,
  Room,
  Category,
  DetailRoom,
  Country,
  Address,
  Facility,
  sequelize,
} = require("../models");
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
    where: { hostId: req.currentHost.id },
  });
  return res.status(200).json(rooms);
};

// 방에 새로운 필드를 추가해서 created를 넣어서 모든 정보를 입력해야지 완전히 등록할 수 있다.
// 1.카테고리 방과 상세방 정보를 먼저 등록한다.
// 2.방 주소를 등록한다.
// 3.방의 편의시설을 등록한다.
// 4.방의 이미지를 등록한다.
module.exports.createRoom = async (req, res) => {
  const { categoryName, roomName, price, description } = req.body.room;
  const category = await Category.findOne({ categoryName: categoryName });
  try {
    const result = await sequelize.transaction(async () => {
      const room = await Room.create({
        hostId: req.currentHost.id,
        categoryId: category.id,
        roomName: roomName,
        price: price,
        description: description,
      });
      const { bedroom, bathroom, capacity } = req.body.detailroom;
      const detailroom = await DetailRoom.create({
        roomId: room.id,
        bedroom: bedroom,
        bathroom: bathroom,
        capacity: capacity,
      });
      return res.status(200).json({
        message:
          "임시로 방이 생성되었습니다. 주소와 옵션과 이미지를 추가해주세요",
      });
    });
  } catch (error) {
    throw new ExpressError(error.message, 400);
  }
};

module.exports.addRoomAddress = async (req, res) => {
  const room = req.currentRoom;
  const {
    countryName,
    streetNumber,
    addressLine1,
    addressLine2,
    city,
    region,
    // geometry,
  } = req.body;
  const country = await Country.findOne({ countryName: countryName });
  const query = `${streetNumber},${addressLine2},${addressLine1},${city},${countryName}`;
  const geoData = await geocoder
    .forwardGeocode({
      query: query,
      limit: 1,
    })
    .send();

  const geometry = geoData.body.features[0].geometry;

  const address = await Address.create({
    roomId: room.id,
    countryId: country.id,
    streetNumber: streetNumber,
    addressLine1: addressLine1,
    addressLine2: addressLine2,
    city: city,
    region: region,
    geometry: geometry,
  });
  return res
    .status(200)
    .json({ message: "방에 주소를 추가하였습니다. 옵션을 선택해주세요" });
};

module.exports.addRoomFacilityOption = async (req, res) => {
  const room = req.currentRoom;
  for (let facility of req.body.facilityList) {
    const foundFacility = await Facility.findOne({
      where: { facilityName: facility },
    });
    room.addFacilities(foundFacility);
  }
  return res
    .json(200)
    .json({
      message: "방에 편의시설 정보를 추가하였스빈다. 이미지를 추가해주세요",
    });
};
