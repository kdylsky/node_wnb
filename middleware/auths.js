const ExpressError = require("../utils/ExpressError");

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
