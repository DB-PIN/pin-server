const Sequelize = require("sequelize");

module.exports = class Pin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        pinId: {
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        userId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            models: "User",
            key: "userId",
          },
          onDelete: "CASCADE",
        },
        categoryId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            models: "Category",
            key: "categoryId",
          },
          onDelete: "CASCADE",
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        latitude: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        modelName: "Pin",
        tableName: "Pin",
        charset: "utf8",
        collate: "utf8_general_ci",
        initialAutoIncrement: 1,
        timestamps: false,
        paranoid: false,
        underscored: false,
      }
    );
  }

  static associate(db) {
    db.Pin.belongsTo(db.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    db.Pin.belongsTo(db.Category, {
      foreignKey: "categoryId",
      onDelete: "CASCADE",
    });
  }
};
