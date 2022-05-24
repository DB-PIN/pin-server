const express = require("express");
const { Emotion } = require("../models");

const router = express.Router();

// 감정 목록 조회
router.get("/", async (req, res) => {
  try {
    const emotionDtos = await Emotion.findAll();
    res.status(200).json(emotionDtos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
