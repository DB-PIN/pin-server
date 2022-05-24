const Sequelize = require("sequelize");

module.exports = class Group extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        groupId: {
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
        name: {
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
        modelName: "Group",
        tableName: "Group",
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
    db.Group.belongsTo(db.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    db.Group.hasMany(db.Pin, {
      foreignKey: "groupId",
    });
  }
};
