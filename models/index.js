const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Category = require("./category");
const Pin = require("./pin");
const Group = require("./group");
const Emotion = require("./emotion");
const Follow = require("./follow");

const db = {};
const sequelize = new Sequelize(
  config.databse,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Category = Category;
db.Pin = Pin;
db.Group = Group;
db.Emotion = Emotion;
db.Follow = Follow;

User.init(sequelize);
Category.init(sequelize);
Pin.init(sequelize);
Group.init(sequelize);
Emotion.init(sequelize);
Follow.init(sequelize);

User.associate(db);
Category.associate(db);
Pin.associate(db);
Group.associate(db);
Emotion.associate(db);
Follow.associate(db);

module.exports = db;
