const Joi = require("joi");

module.exports.DetailUserSchema = Joi.object({
  firstName: Joi.string().not("").required(),
  lastName: Joi.string().not("").required(),
  phoneNumber: Joi.string()
    .regex(/^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/)
    .messages({ "string.pattern.base": `휴대전화 형식이 잘못 됬습니다.` })
    .required(),
}).options({ abortEarly: false });
