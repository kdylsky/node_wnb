const Sequelize = require("sequelize");

class Host extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hostImageUrl: {
          type: Sequelize.STRING,
          allowNull: false,
          get() {
            const currentImage = this.getDataValue("hostImageUrl");
            return currentImage.replace("/upload", "/upload/w_500");
          },
        },
        hostImageFileName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Host",
        tableName: "hosts",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }
  static associate(db) {
    Host.belongsTo(db.User, { foreignKey: "userId", targetKey: "snsId" });
  }
}

module.exports = Host;
