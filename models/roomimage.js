const Sequelize = require("sequelize");

class RoomImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        roomImageUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        roomImageFileName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "RoomImage",
        tableName: "roomimages",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    RoomImage.belongsTo(db.Room, { foreignKey: "roomId", targetKey: "id" });
  }
}

module.exports = RoomImage;
