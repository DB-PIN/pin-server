const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const { sequelize, User } = require("./models");
require("dotenv").config();
const { generateDummy } = require("./models/dummy");
const passport = require("passport");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
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
    httpOnly: true,
    key: "sid",
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      maxAge: 24000 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
          const result = password == exUser.password;
          if (result) {
            done(null, exUser);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } else {
          done(null, false, { message: "가입되지 않은 회원입니다." });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ where: { userId } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
