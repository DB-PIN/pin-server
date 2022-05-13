const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
// const { generateDummy } = require('./models/dummy');

dotenv.config();

const app = express();
app.set("port", process.env.PORT);

// force가 true이면 DB reset
const force = false;

sequelize
  .sync({ force })
  .then(() => {
    console.log("DB 연결 성공");

    // if (force) {
    //   generateDummy();
    // }
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieParser(process.env.COOKIE_SECRET)));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/api", require("./routes"));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
