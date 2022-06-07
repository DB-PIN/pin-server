const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        email: {
          type: "varchar(50)",
          allowNull: true,
        },
        password: {
          type: "varchar(50)",
          allowNull: false,
        },
        name: {
          type: "varchar(50)",
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
        modelName: "User",
        tableName: "User",
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
    db.User.hasMany(db.Group, {
      foreignKey: "userId",
    });
    db.User.hasMany(db.Follow, {
      foreignKey: "followerId",
    });
    db.User.hasMany(db.Follow, {
      foreignKey: "followingId",
    });
  }
};
