const {
  DetailUserSchema,
  CreateHostRoomSchema,
  AddHostRoomAddressSchema,
  AddHostRoomFacilitySchema,
  EnrollPaymentSchema,
} = require("../joiSchemas");
const ExpressError = require("../utils/ExpressError");

module.exports.patchUserValidation = (req, res, next) => {
  const { error } = DetailUserSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.createRoomValidation = (req, res, next) => {
  const { error } = CreateHostRoomSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.addRoomAddressValidation = (req, res, next) => {
  const { error } = AddHostRoomAddressSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.addRoomFacilityValidation = (req, res, next) => {
  const { error } = AddHostRoomFacilitySchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.enrollPaymentValidation = (req, res, next) => {
  const { error } = EnrollPaymentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
