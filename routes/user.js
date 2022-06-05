const express = require("express");
const passport = require("passport");
const { sequelize, User, Pin, Group } = require("../models");

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

// 핀 추가
router.post("/pin", async (req, res) => {
  try {
    const pinDto = await Pin.create(req.body);
    res.status(200).json(pinDto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 핀 수정
router.patch("/pin/:pinId", async (req, res) => {
  try {
    await Pin.update(req.body, { where: { pinId: req.params.pinId } });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 핀 삭제
router.delete("/pin/:pinId", async (req, res) => {
  try {
    await Pin.destroy({
      where: { pinId: req.params.pinId },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 그룹 목록 조회
router.get("/groups", async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user.userId;
      const groupItemDtos = await sequelize.query(`
      SELECT P.groupId, G.name, count(pinId) AS 'count'
      FROM pin.pin P
      JOIN pin.group G
      ON P.groupId = G.groupId
      WHERE P.userId = ${userId}
      GROUP BY groupId;
      `);
      res.status(200).json(groupItemDtos[0]);
    } else {
      res.status(400).json({ message: "no user in session" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 그룹 추가
router.post("/group", async (req, res) => {
  try {
    const groupDto = await Group.create(req.body);
    res.status(200).json(groupDto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 그룹 삭제
router.delete("/group/:groupId", async (req, res) => {
  try {
    await Group.destroy({
      where: { groupId: req.params.groupId },
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
