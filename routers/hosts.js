const express = require("express");
const router = express.Router();
const {
  createRoomValidation,
  addRoomAddressValidation,
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
const multer = require("multer");
const upload = multer({ storage: hostStorage });

router.get("/", isLoggedIn, isHost, wrapAsync(hosts.showHostInfo));
router.post(
  "/",
  isLoggedIn,
  alreayHost,
  upload.single("image"),
  wrapAsync(hosts.createHost)
);
router.patch(
  "/:host_id",
  isLoggedIn,
  isHost,
  authorHost,
  upload.single("image"),
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
  // isLoggedIn,
  // isHost,
  // authorHost,
  // authorRoom,
  wrapAsync(hosts.addRoomFacilityOption)
);
