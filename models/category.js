const Sequelize = require("sequelize");

class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        categroyName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "categories",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Category.hasMany(db.Room, { foreignKey: "categoryId", sourceKey: "id" });
  }
}

module.exports = Category;
