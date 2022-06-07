const express = require("express");
const { sequelize, Pin } = require("../models");

const router = express.Router();

// 핀 목록 조회 (전체)
router.get("/", async (req, res) => {
  try {
    const pinItemDtos = await sequelize.query(`
    SELECT P.pinId, U.userId, U.name AS 'userName', P.name, P.address, P.categoryId, P.emotionId, G.name AS 'groupName'
    FROM pin.pin P 
    JOIN pin.group G
    ON G.groupId = P.groupId
    JOIN pin.user U
    ON G.userId = U.userId
    WHERE P.createdAt >= date_add(now(), interval -3 year)
    ;
    `);
    res.status(200).json(pinItemDtos[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

// 핀 목록 조회 (필터 적용)
router.get(
  "/emotion/:emotionId/category/:categoryId/follow/:followId",
  async (req, res) => {
    const emotionId = req.params.emotionId == -1 ? "%" : req.params.emotionId;
    const categoryId =
      req.params.categoryId == -1 ? "%" : req.params.categoryId;
    const followId = req.params.followId == -1 ? "%" : req.params.followId;
    try {
      const pinItemDtos = await sequelize.query(`
      SELECT P.pinId, U.userId, U.name AS 'userName', P.name, P.address, P.categoryId, P.emotionId, G.name AS 'groupName'
      FROM pin.pin P 
      JOIN pin.group G
      ON G.groupId = P.groupId
      JOIN pin.user U
      ON G.userId = U.userId
      WHERE P.emotionId like "${emotionId}" and P.categoryId like "${categoryId}" and U.userId LIKE "${followId}"
      AND 
      P.createdAt >= date_add(now(), interval -3 year)
      ;
      `);
      res.status(200).json(pinItemDtos[0]);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "error" });
    }
  }
);

module.exports = router;
