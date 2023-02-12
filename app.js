const express = require("express");
const { sequelize } = require("./models");
const app = express();

app.listen(3000, () => {
  console.log("Server Starting");
});

sequelize
  .sync({}) //alter: true 기존데이터는 유지하면서 업데이트 not null인 속성이 있으면 에러처리해주어야 한다.
  .then(() => {
    console.log("connect databases");
  })
  .catch((err) => {
    console.error(err);
  });
