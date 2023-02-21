const Joi = require("joi");
const { countryList, categoryList, faciltyList } = require("./utils/seedData");

module.exports.DetailUserSchema = Joi.object({
  firstName: Joi.string().not("").required(),
  lastName: Joi.string().not("").required(),
  phoneNumber: Joi.string()
    .regex(/^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/)
    .messages({ "string.pattern.base": `휴대전화 형식이 잘못 됬습니다.` })
    .required(),
}).options({ abortEarly: false });

module.exports.CreateHostRoomSchema = Joi.object({
  room: Joi.object({
    categoryName: Joi.string()
      .allow(...categoryList)
      .only()
      .required(),
    roomName: Joi.string().not("").required(),
    price: Joi.number().not("").min(1).required(),
    description: Joi.string().not("").required(),
  }).required(),
  detailroom: Joi.object({
    bedroom: Joi.number().min(1).required(),
    bathroom: Joi.number().min(1).required(),
    capacity: Joi.number().min(1).required(),
  }).required(),
}).options({ abortEarly: false });

module.exports.AddHostRoomAddressSchema = Joi.object({
  countryName: Joi.string()
    .allow(...countryList)
    .only()
    .required(),
  streetNumber: Joi.number().min(1).required(),
  addressLine1: Joi.string().not("").required(),
  addressLine2: Joi.string().not("").optional(),
  city: Joi.string().not("").required(),
  region: Joi.string().not("").optional(),
}).options({ abortEarly: false });

module.exports.AddHostRoomFacilitySchema = Joi.object({
  facilityList: Joi.array().items(
    Joi.string()
      .allow(...faciltyList)
      .only()
      .required()
  ),
}).options({ abortEarly: false });

module.exports.EnrollPaymentSchema = Joi.object({
  cardNumber: Joi.number().not("").required(),
  cvv: Joi.number().not("").required(),
  expireDay: Joi.date().iso().required(),
}).options({ abortEarly: false });
