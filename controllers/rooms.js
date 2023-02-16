const { Room, DetailRoom } = require("../models");

module.exports.userShowRoom = async (req, res) => {
  const rooms = await Room.findAll({ where: { isCreatedAll: true } });
  res.status(200).json(rooms);
};
