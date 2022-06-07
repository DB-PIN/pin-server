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
        categoryId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            models: "Category",
            key: "categoryId",
          },
          onDelete: "CASCADE",
        },
        emotionId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            models: "Emotion",
            key: "emotionId",
          },
          onDelete: "CASCADE",
        },
        groupId: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          references: {
            models: "Group",
            key: "groupId",
          },
          onDelete: "CASCADE",
        },
        name: {
          type: "varchar(10)",
          allowNull: false,
        },
        address: {
          type: "varchar(45)",
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
    db.Pin.belongsTo(db.Category, {
      foreignKey: "categoryId",
      onDelete: "CASCADE",
    });
    db.Pin.belongsTo(db.Emotion, {
      foreignKey: "emotionId",
      onDelete: "CASCADE",
    });
    db.Pin.belongsTo(db.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE",
    });
  }
};
