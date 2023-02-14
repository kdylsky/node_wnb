const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isNotLoggedIn } = require("../middleware/auths");
const { patchUserValidation } = require("../middleware/joiMiddleware");

const users = require("../controllers/users");

// 요청을 보내면, 카카오 로그인 페이지로 가게 되고, 로그인이 하게되면 카카오에서 콜백url설정한 곳으로 리다리렉트 한다.
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));

// 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get(
  "/kakao/callback",
  //그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate("kakao"),
  // kakaoStrategy에서 성공한다면 콜백 실행
  wrapAsync(users.kakaoLogin)
);
router.patch(
  "/",
  isLoggedIn,
  patchUserValidation,
  wrapAsync(users.addUserDetail)
);

router.get("/logout", isLoggedIn, wrapAsync(users.logout));

module.exports = router;
