require("dotenv").config();
const env = process.env;

const hostCloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//cloudinary의 계정과 코드에서 생성되는 cloudinary의 인스턴스를 연결해준다.
hostCloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

// 저장공간에 대한 설정이다.
const hostStorage = new CloudinaryStorage({
  cloudinary: hostCloudinary,
  params: {
    folder: "Host",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  hostCloudinary,
  hostStorage,
};
