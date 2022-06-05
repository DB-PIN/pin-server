const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const { sequelize } = require("./models");
require("dotenv").config();
const { generateDummy } = require("./models/dummy");
const passport = require("passport");
const passportConfig = require("./passport");
const cors = require("cors");

const app = express();
passportConfig();
app.set("port", process.env.PORT);

// force가 true이면 DB reset
const force = false;

sequelize
  .sync({ force })
  .then(() => {
    console.log("DB 연결 성공");

    if (force) {
      generateDummy();
    }
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
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

const whiteList = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      if (origin && whiteList.indexOf(origin) == -1)
        callback(new Error("Not Allowed Origin"));
      else callback(null, true);
    },
    credentials: true,
  })
);

app.use("/api", require("./routes/index"));

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

app.use(passport.initialize());
app.use(passport.session());
