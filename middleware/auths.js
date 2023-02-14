const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { Host } = require("../models");

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
