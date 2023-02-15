const Sequelize = require("sequelize");

class Country extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        countryName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Country",
        tableName: "countries",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Country.hasOne(db.Address, { foreignKey: "countryId", sourceKey: "id" });
  }
}

module.exports = Country;
