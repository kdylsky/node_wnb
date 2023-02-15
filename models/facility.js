const Sequelize = require("sequelize");

class Facility extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        facilityName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Facility",
        tableName: "facilities",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Facility.belongsToMany(db.Room, { through: "RoomFacility" });
  }
}

module.exports = Facility;
