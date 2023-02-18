const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { Host, Room, WishList, RoomImage, Address } = require("../models");

module.exports.isLoggedIn = (req, res, next) => {
  // isAuthenticated()로 로그인이 되었는지 아닌지를 확인
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new ExpressError("로그인이 필요합니다.", 403);
  }
};

module.exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 로그인 안되어있으면 다음 미들웨어
  } else {
    throw new ExpressError("이미 로그인이 되었습니다.", 400);
  }
};

module.exports.isHost = wrapAsync(async (req, res, next) => {
  const host = await Host.findOne({ where: { userId: req.user.snsId } });
  if (!host) {
    throw new ExpressError("호스트가 아닙니다.", 400);
  }
  next();
});

module.exports.alreayHost = wrapAsync(async (req, res, next) => {
  const host = await Host.findOne({ where: { userId: req.user.snsId } });
  if (host) {
    throw new ExpressError("이미 호스트로 등록되어있습니다.", 400);
  }
  next();
});

module.exports.authorHost = wrapAsync(async (req, res, next) => {
  const { host_id } = req.params;
  const host = await Host.findByPk(host_id);
  if (!host) {
    throw new ExpressError("호스트 정보가 올바르지 않습니다.", 400);
  }
  if (host.userId !== req.user.snsId) {
    throw new ExpressError("[호스트] 권한이 없습니다.", 400);
  }
  req.currentHost = host;
  next();
});

module.exports.authorRoom = wrapAsync(async (req, res, next) => {
  const { room_id } = req.params;
  const room = await Room.findByPk(room_id);
  if (!room) {
    throw new ExpressError("[호스트-방]방 정보가 올바르지 않습니다.", 400);
  }
  if (room.hostId !== req.currentHost.id) {
    throw new ExpressError("[호스트-방] 권한이 없습니다.", 400);
  }
  req.currentRoom = room;
  next();
});

module.exports.authorWishList = wrapAsync(async (req, res, next) => {
  const { wishList_id } = req.params;
  const wishList = await WishList.findByPk(wishList_id, {
    include: [
      {
        model: Room,
        include: [
          {
            model: RoomImage,
          },
          {
            model: Address,
          },
        ],
      },
    ],
  });
  if (!wishList) {
    throw new ExpressError("[wishlist] 정보가 없습니다.", 400);
  }
  if (wishList.useId !== req.user.snsId) {
    throw new ExpressError("[wishlist] 권한이 없습니다.", 400);
  }
  req.currentWishList = wishList;
  next();
});
