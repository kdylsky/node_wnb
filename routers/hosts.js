const express = require("express");
const router = express.Router();

const { isLoggedIn, isHost, alreayHost } = require("../middleware/auths");
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
module.exports = router;
