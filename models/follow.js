const Sequelize = require("sequelize");

module.exports = class Follow extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        followId: {
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        followerId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            models: "User",
            key: "userId",
          },
          onDelete: "CASCADE",
        },
        followingId: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            models: "User",
            key: "userId",
          },
          onDelete: "CASCADE",
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
        modelName: "Follow",
        tableName: "Follow",
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
    db.Follow.belongsTo(db.User, {
      foreignKey: "followerId",
      onDelete: "CASCADE",
    });
    db.Follow.belongsTo(db.User, {
      foreignKey: "followingId",
      onDelete: "CASCADE",
    });
  }
};
