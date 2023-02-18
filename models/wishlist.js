const Sequelize = require("sequelize");

class WishList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        listName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "WishList",
        tableName: "wishlists",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    WishList.belongsTo(db.User, { foreignKey: "userId", targetKey: "snsId" });
    WishList.belongsToMany(db.Room, {
      through: db.WishListRoom,
      foreignKey: "wishListId",
      sourceKey: "id",
      targetKey: "id",
    });
  }
}

module.exports = WishList;
