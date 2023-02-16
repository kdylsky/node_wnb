const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const rooms = require("../controllers/rooms");
const { isLoggedIn, isHost } = require("../middleware/auths");

router.get("/", wrapAsync(rooms.userShowRoom));
router.post("/", wrapAsync(rooms.createRoom));
module.exports = router;
