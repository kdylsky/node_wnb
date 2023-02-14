const express = require("express");
const router = express.Router();
const { isLoggedIn, isHost, alreayHost } = require("../middleware/auths");
const wrapAsync = require("../utils/wrapAsync");
const hosts = require("../controllers/hosts");

router.get("/", isLoggedIn, isHost, wrapAsync(hosts.showHostInfo));
router.post("/", isLoggedIn, wrapAsync(hosts.createHost));
module.exports = router;
