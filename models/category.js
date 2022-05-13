const Sequelize = require("sequelize");

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        categoryId: {
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: "varchar(10)",
          allowNull: true,
        },
        color: {
          type: "varchar(10)",
          allowNull: true,
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
        modelName: "Category",
        tableName: "Category",
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
    db.Category.hasMany(db.Pin, {
      foreignKey: "categoryId",
    });
  }
};
