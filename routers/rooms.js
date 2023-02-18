const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const rooms = require("../controllers/rooms");
const { existRoom } = require("../middleware/rooms");
const { isLoggedIn } = require("../middleware/auths");

router.get("/", wrapAsync(rooms.userShowRoom));
router.get("/:room_id", existRoom, wrapAsync(rooms.userRetriveRoom));
router.post(
  "/:room_id/wishlist",
  isLoggedIn,
  existRoom,
  wrapAsync(rooms.userAddWishList)
);
module.exports = router;
