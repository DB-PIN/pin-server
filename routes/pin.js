const express = require("express");
const { sequelize, Pin } = require("../models");

const router = express.Router();

// 핀 목록 조회 (전체)
router.get("/", async (req, res) => {
  try {
    const pinItemDtos = await sequelize.query(`
    SELECT P.pinId, U.name AS 'userName', P.name, P.address, P.categoryId, P.emotionId, G.name AS 'groupName'
    FROM pin.pin P
    JOIN pin.user U
    ON P.userId = U.userId
    JOIN pin.group G
    ON G.groupId = P.groupId;
    `);
    res.status(200).json(pinItemDtos[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
