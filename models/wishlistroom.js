const Sequelize = require("sequelize");

class WishListRoom extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        wishListId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        roomId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "WishListRoom",
        tableName: "wishlistrooms",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {}
}

module.exports = WishListRoom;
