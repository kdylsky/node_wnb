module.exports.kakaoLogin = async (req, res) => {
  res.status(200).json({ messaga: "로그인에 성공했습니다." });
};

module.exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
  });
  req.session.destroy();
  res.status(200).json({ messaga: "로그아웃이 완료되었습니다." });
};
