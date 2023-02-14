require("dotenv").config();
const env = process.env;

const express = require("express");
const app = express();
const { sequelize } = require("./models");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const ExpressError = require("./utils/ExpressError");

const UserRouter = require("./routers/users");
const HostRouter = require("./routers/hosts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션설정 세팅하기
const sessionCongif = {
  secret: env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionCongif));

// passport 초기화 및 세션 이용
app.use(passport.initialize());
app.use(passport.session());

passportConfig(); // 패스포트 설정

app.use("/auth", UserRouter);
app.use("/hosts", HostRouter);

// 잘못된 주소로 요청이 들어올 경우
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// 에러핸들러
app.use((error, req, res, next) => {
  const { status = 500 } = error;
  if (!error.message) {
    error.message = "Default Error Message";
  }
  res.status(status).json({ name: error.name, message: error.message });
});

app.listen(3000, () => {
  console.log("Server Starting");
});

sequelize
  .sync({ alter: true }) //alter: true 기존데이터는 유지하면서 업데이트 not null인 속성이 있으면 에러처리해주어야 한다.
  .then(() => {
    console.log("connect databases");
  })
  .catch((err) => {
    console.error(err);
  });
