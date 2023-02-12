const express = require("express");
const { sequelize } = require("./models");
const app = express();
const ExpressError = require("./utils/ExpressError");

const UserRouter = require("./routers/users");

app.listen(3000, () => {
  console.log("Server Starting");
});

app.use("/users", UserRouter);

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

sequelize
  .sync({ alter: true }) //alter: true 기존데이터는 유지하면서 업데이트 not null인 속성이 있으면 에러처리해주어야 한다.
  .then(() => {
    console.log("connect databases");
  })
  .catch((err) => {
    console.error(err);
  });
