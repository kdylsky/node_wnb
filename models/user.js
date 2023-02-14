const { UUIDV4 } = require("sequelize");
const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        snsId: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
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
        provider: {
          type: Sequelize.STRING,
          primaryKey: true,
          defaultValue: "local",
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    User.hasOne(db.DetailUser, {
      foreignKey: "userDetailId",
      sourceKey: "snsId",
    });
    User.hasOne(db.Host, {
      foreignKey: "userId",
      sourceKey: "snsId",
    });
  }
}

module.exports = User;
