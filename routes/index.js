const express = require("express");

const router = express.Router();

router.use("/user", require("./user")); // api/user/
router.use("/pins", require("./pin")); // api/pins/
router.use("/emotions", require("./emotion")); // api/emotions

module.exports = router;
