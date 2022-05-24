const express = require("express");
const { Pin } = require("../models");

const router = express.Router();

// 핀 목록 조회 (전체)
router.get("/", async (req, res) => {
  try {
    const pinDtos = await Pin.findAll();
    res.status(200).json(pinDtos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
