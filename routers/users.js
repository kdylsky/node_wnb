const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../middleware/auths"); // 내가 만든 사용자 미들웨어

//* 카카오로 로그인하기 라우터 ***********************
//? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));

//? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get(
  "/kakao/callback",
  //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate("kakao", {
    // failureRedirect: "/", // kakaoStrategy에서 실패한다면 실행
    failureMessage: "로그인 에러가 발생했습니다.",
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    res.send("로그인 성공했습니다.");
  }
);

//* 로그아웃 (isLoggedIn 상태일 경우)
router.get("/logout", isLoggedIn, (req, res, next) => {
  // req.user (사용자 정보가 안에 들어있다. 당연히 로그인되어있으니 로그아웃하려는 거니까)
  req.logout((err) => {
    if (err) next(err);
    // req.flash("success", "Goodbye 😊");
    // res.redirect("/campgrounds");
    res.send("로그아웃 오류");
  });
  res.send("로그아웃되었습니다.");

  // req.logout();
  // req.session.destroy(); // 로그인인증 수단으로 사용한 세션쿠키를 지우고 파괴한다. 세션쿠키가 없다는 말은 즉 로그아웃 인 말.
  // res.send("로그아웃되었습니다.");
  // res.redirect("/");
});

router.get("/test", isLoggedIn, (req, res) => {
  res.send(req.user);
});

module.exports = router;
