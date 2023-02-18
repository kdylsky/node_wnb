const Sequelize = require("sequelize");

// 클래스를 불러온다.
const User = require("./user");
const DetailUser = require("./detailuser");
const Host = require("./host");
const Category = require("./category");
const Room = require("./room");
const Facility = require("./facility");
const DetailRoom = require("./detailroom");
const RoomImage = require("./roomimage");
const Country = require("./country");
const Address = require("./address");
const WishList = require("./wishlist");
const WishListRoom = require("./wishlistroom");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize;

// 모델 클래스를 넣음.
db.User = User;
db.DetailUser = DetailUser;
db.Host = Host;
db.Category = Category;
db.Room = Room;
db.Facility = Facility;
db.DetailRoom = DetailRoom;
db.RoomImage = RoomImage;
db.Country = Country;
db.Address = Address;
db.WishList = WishList;
db.WishListRoom = WishListRoom;

// 모델과 테이블 종합적인 연결이 설정된다.
User.init(sequelize);
DetailUser.init(sequelize);
Host.init(sequelize);
Category.init(sequelize);
Room.init(sequelize);
Facility.init(sequelize);
DetailRoom.init(sequelize);
RoomImage.init(sequelize);
Country.init(sequelize);
Address.init(sequelize);
WishList.init(sequelize);
WishListRoom.init(sequelize);

// db객체 안에 있는 모델들 간의 관계가 설정된다.
User.associate(db);
DetailUser.associate(db);
Host.associate(db);
Category.assoicate(db);
Room.associate(db);
Facility.associate(db);
DetailRoom.associate(db);
RoomImage.associate(db);
Country.associate(db);
Address.associate(db);
WishList.associate(db);
WishListRoom.associate(db);

// 모듈로 꺼낸다.
module.exports = db;
