const {
  DetailUserSchema,
  CreateHostRoomSchema,
  AddHostRoomAddress,
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
  const { error } = AddHostRoomAddress.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
