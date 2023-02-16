const express = require("express");
const router = express.Router();
const {
  createRoomValidation,
  addRoomAddressValidation,
  addRoomFacilityValidation,
} = require("../middleware/joiMiddleware");

const {
  isLoggedIn,
  isHost,
  alreayHost,
  authorHost,
  authorRoom,
} = require("../middleware/auths");
const wrapAsync = require("../utils/wrapAsync");
const hosts = require("../controllers/hosts");
const { hostStorage } = require("../cloudinary/hosts");
const { roomStorage } = require("../cloudinary/rooms");
const multer = require("multer");
const uploadHost = multer({ storage: hostStorage });
const uploadRoom = multer({ storage: roomStorage });

// 호스트로 등록했다면 등록된 호스트 정보 보기
router.get("/", isLoggedIn, isHost, wrapAsync(hosts.showHostInfo));

// 호스트로 등록이 않되었다면 호스트로 등록하기
router.post(
  "/",
  isLoggedIn,
  alreayHost,
  uploadHost.single("image"),
  wrapAsync(hosts.createHost)
);

// 호스트 등록 후 이미지 변경
router.patch(
  "/:host_id",
  isLoggedIn,
  isHost,
  authorHost,
  uploadHost.single("image"),
  wrapAsync(hosts.updateHostInfo)
);

// 호스트가 가지고 있는 모든 숙소 출력하기
router.get(
  "/:host_id/rooms",
  isLoggedIn,
  isHost,
  authorHost,
  wrapAsync(hosts.showHostRooms)
);

// 호스트 숙소 등록하기
router.post(
  "/:host_id/rooms",
  isLoggedIn,
  isHost,
  authorHost,
  createRoomValidation,
  wrapAsync(hosts.createRoom)
);

// 호스트의 특정 숙소 출력하기
router.get(
  "/:host_id/rooms/:room_id",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  wrapAsync(hosts.retriveHostRoom)
);

// 등록된 방에 주소 추가하기
router.post(
  "/:host_id/rooms/:room_id/address",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  addRoomAddressValidation,
  wrapAsync(hosts.addRoomAddress)
);

// 등록된 방에 편의시설 추가하기
router.post(
  "/:host_id/rooms/:room_id/facility",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  addRoomFacilityValidation,
  wrapAsync(hosts.addRoomFacilityOption)
);

// 등록된 방에 이미지 추가하기
router.post(
  "/:host_id/rooms/:room_id/images",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  uploadRoom.array("rooms"),
  wrapAsync(hosts.addRoomImage)
);

module.exports = router;
