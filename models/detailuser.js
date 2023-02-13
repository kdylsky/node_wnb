const Sequelize = require("sequelize");

class DetailUser extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userDetailId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "DetailUser",
        tableName: "detailusers",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    DetailUser.belongsTo(db.User, {
      foreignKey: "userDetailId",
      targetKey: "snsId",
    });
  }
}

module.exports = DetailUser;
