require("dotenv").config();
const env = process.env;
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const ExpressError = require("../utils/ExpressError");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: env.KAKAO_RESTKEY, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: env.KAKAO_CALLBACK_URL, // 카카오 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const [user, isCreated] = await User.findOrCreate({
            where: { snsId: profile._json.id, provider: "kakao" },
            defaults: {
              email: profile._json.kakao_account.email,
              nickname: profile._json.properties.nickname,
              profileImage: profile._json.properties.thumbnail_image,
            },
          });
          console.log(isCreated);
          if (!isCreated) {
            user.setDataValue("nickname", profile._json.properties.nickname);
            user.setDataValue(
              "profileImage",
              profile._json.properties.thumbnail_image
            );
          }
          await user.save();
          done(null, user);
        } catch (error) {
          done(new ExpressError(error.message, 400));
        }
      }
    )
  );
};
