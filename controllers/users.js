const { User, DetailUser, WishList, Room } = require("../models");

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

module.exports.addUserDetail = async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  console.log(req.body);
  console.log(req.user);
  const [updateUser, isCreated] = await DetailUser.findOrCreate({
    where: { userDetailId: req.user.snsId },
    defaults: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    },
  });
  console.log(isCreated);
  if (!isCreated) {
    updateUser.phoneNumber = phoneNumber;
  }
  await updateUser.save();
  return res.status(200).json({ messaga: "유저 정보를 업데이트 했습니다." });
};

module.exports.showWishList = async (req, res) => {
  const wishLists = await WishList.findAll({
    userId: req.user.snsId,
  });
  return res.status(200).json(wishLists);
};

module.exports.retriveWishList = async (req, res) => {
  const wishlist = req.currentWishList;
  return res.status(200).json(wishlist);
};

module.exports.createWishList = async (req, res) => {
  const user = req.user;
  const wishList = WishList.create({
    userId: user.snsId,
    listName: req.body.listName,
  });
  return res
    .status(200)
    .json({ message: `[${req.body.listName}] 위시 리스트가 생성되었습니다.` });
};
