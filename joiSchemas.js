const Joi = require("joi");

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
    categoryName: Joi.string().not("").required(),
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

module.exports.AddHostRoomAddress = Joi.object({
  countryName: Joi.string().not("").required(),
  streetNumber: Joi.number().min(1).required(),
  addressLine1: Joi.string().not("").required(),
  addressLine2: Joi.string().not("").optional(),
  city: Joi.string().not("").required(),
  region: Joi.string().not("").optional(),
  geometry: Joi.object({
    type: Joi.string().allow("Point").only().required(),
    coordinates: Joi.array().items(
      Joi.number().min(-180).max(180).required(),
      Joi.number().min(0).max(90).required()
    ),
  }).required(),
}).options({ abortEarly: false });
