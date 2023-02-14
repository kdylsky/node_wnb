const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isLoggedIn, isHost, alreayHost } = require("../middleware/auths");
const wrapAsync = require("../utils/wrapAsync");
const hosts = require("../controllers/hosts");
const { hostStorage } = require("../cloudinary/hosts");
const upload = multer(hostStorage);

router.get("/", isLoggedIn, isHost, wrapAsync(hosts.showHostInfo));
router.post(
  "/",
  isLoggedIn,
  alreayHost,
  upload.array("image"),
  wrapAsync(hosts.createHost)
);
module.exports = router;
