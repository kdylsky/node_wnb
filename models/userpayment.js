const Sequelize = require("sequelize");

class UserPayment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        caedNumber: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        cvv: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        expireDay: {
          type: Sequelize.CHAR,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "UserPayment",
        tableName: "userpayments",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }

  static associate(db) {
    UserPayment.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "snsId",
    });
    UserPayment.hasOne(db.Reservation, {
      foreignKey: "paymentId",
      sourceKey: "id",
    });
  }
}

module.exports = UserPayment;
