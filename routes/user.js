const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

// 회원 정보 조회
router.get("/", async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.userId;
      const user = await User.findOne({
        where: { userId },
      });
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "no user in session" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 회원가입 라우터
router.post("/", async (req, res) => {
  const { email, nickname, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(400).json({ message: "already joined user" });
    }
    const userDto = await User.create(req.body);
    res.status(200).json(userDto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 로그인 라우터
router.post("/login", async (req, res) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      res.status(400).json({ message: "Auth Error" });
    }
    if (!user) {
      console.error(info.message);
      res.status(400).json({ message: "Login Error" });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        res.status(400).json({ message: "Login Error" });
      }
      res.status(200).json({});
    });
  })(req, res);
});

// 로그아웃 라우터
router.get("/logout", async (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({});
});

module.exports = router;
