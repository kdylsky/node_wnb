const Sequelize = require("sequelize");

class Reservation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        paymentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        checkIn: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        checkOut: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        people: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Reservation",
        tableName: "reservations",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Reservation.belongsTo(db.UserPayment, {
      foreignKey: "paymentId",
      targetKey: "id",
    });
    Reservation.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "snsId",
    });
    Reservation.belongsTo(db.Room, {
      foreignKey: "roomId",
      targetKey: "id",
    });
  }
}

module.exports = Reservation;
