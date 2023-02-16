const { Room, DetailRoom } = require("../models");

module.exports.userShowRoom = async (req, res) => {
  const rooms = await Room.findAll({});
  res.status(200).json(rooms);
};

module.exports.createRoom = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("it work");
};

// 방에 새로운 필드를 추가해서 created를 넣어서 모든 정보를 입력해야지 완전히 등록할 수 있다.
// 1.카테고리 방과 상세방 정보를 먼저 등록한다.
// 2.방 주소를 등록한다.
// 3.방의 편의시설을 등록한다.
// 4.방의 이미지를 등록한다.

// roombody = {
//   address: {
//     countryId:1,
//     roomId:1,
//     streetNumber: 1,
//     addressLine1: "테헤란로",
//     addressLine2: "111-1",
//     city: "seoul",
//     region: "서울",
//     geometry: {
//       type: "POINT",
//       coordinates: ["lng", "lat"],
//     },
//   },
// };
