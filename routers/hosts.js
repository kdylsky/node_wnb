const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  isHost,
  alreayHost,
  authorHost,
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
