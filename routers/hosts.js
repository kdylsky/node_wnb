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

router.get("/", isLoggedIn, isHost, wrapAsync(hosts.showHostInfo));
router.post(
  "/",
  isLoggedIn,
  alreayHost,
  uploadHost.single("image"),
  wrapAsync(hosts.createHost)
);
router.patch(
  "/:host_id",
  isLoggedIn,
  isHost,
  authorHost,
  uploadHost.single("image"),
  wrapAsync(hosts.updateHostInfo)
);

router.get(
  "/:host_id/rooms",
  isLoggedIn,
  isHost,
  authorHost,
  wrapAsync(hosts.showHostRooms)
);
module.exports = router;

router.post(
  "/:host_id/rooms",
  isLoggedIn,
  isHost,
  authorHost,
  createRoomValidation,
  wrapAsync(hosts.createRoom)
);
router.post(
  "/:host_id/rooms/:room_id/address",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  addRoomAddressValidation,
  wrapAsync(hosts.addRoomAddress)
);

router.post(
  "/:host_id/rooms/:room_id/facility",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  addRoomFacilityValidation,
  wrapAsync(hosts.addRoomFacilityOption)
);

router.post(
  "/:host_id/rooms/:room_id/images",
  isLoggedIn,
  isHost,
  authorHost,
  authorRoom,
  uploadRoom.array("rooms"),
  wrapAsync(hosts.addRoomImage)
);
