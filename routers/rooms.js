const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const rooms = require("../controllers/rooms");
const { existRoom } = require("../middleware/rooms");

router.get("/", wrapAsync(rooms.userShowRoom));
router.get("/:room_id", existRoom, wrapAsync(rooms.userRetriveRoom));
module.exports = router;
