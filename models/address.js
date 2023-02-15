const Sequelize = require("sequelize");

class Address extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        countryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        streetNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        addressLine1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        addressLine2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        region: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        geometry: {
          type: Sequelize.GEOMETRY,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Address",
        tableName: "addresses",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Address.belongsTo(db.Country, { foreignKey: "countryId", targetKey: "id" });
    Address.belongsTo(db.Room, { foreignKey: "roomId", targetKey: "id" });
  }
}

module.exports = Address;
