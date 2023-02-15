const Sequelize = require("sequelize");

class DetailRoom extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        bedroom: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        bathroom: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "DetailRoom",
        tableName: "detailrooms",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    DetailRoom.belongsTo(db.Room, { foreignKey: "roomId", targetKey: "id" });
  }
}

module.exports = DetailRoom;
