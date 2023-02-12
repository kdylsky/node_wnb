const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        kakaoId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        profileImage: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        point: {
          type: Sequelize.INTEGER,
          defaultValue: 100000,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
      }
    );
  }
  static associate(db) {}
}

module.exports = User;
