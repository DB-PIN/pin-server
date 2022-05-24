const express = require("express");
const { Category } = require("../models");

const router = express.Router();

// 카테고리 목록 조회
router.get("/", async (req, res) => {
  try {
    const categoryDtos = await Category.findAll();
    res.status(200).json(categoryDtos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
