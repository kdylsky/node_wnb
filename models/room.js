const Sequelize = require("sequelize");

class Room extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        hostId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        roomName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Room",
        tableName: "rooms",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Room.belongsTo(db.Category, { foreignKey: "categoryId", targetKey: "id" });
    Room.belongsTo(db.Host, { foreignKey: "hostId", targetKey: "id" });
    Room.hasOne(db.DetailRoom, { foreignKey: "roomId", sourceKey: "id" });
    Room.hasOne(db.Address, { foreignKey: "roomId", sourceKey: "id" });
    Room.hasMany(db.RoomImage, { foreignKey: "roomId", sourceKey: "id" });
    Room.belongsToMany(db.Facility, { through: "RoomFacility" });
  }
}

module.exports = Room;
