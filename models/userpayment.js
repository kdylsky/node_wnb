const Sequelize = require("sequelize");

class UserPayment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cardNumber: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cvv: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        expireDay: {
          type: Sequelize.CHAR,
          allowNull: false,
          set(value) {
            const date_list = value.split("-");
            this.setDataValue(
              "expireDay",
              `${date_list[1]}/${date_list[0].slice(2, 4)}`
            );
          },
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
