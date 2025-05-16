var express = require("express");
var router = express.Router();
var groupService = require("../services/groupService");

router.get("/first-group", async (req, res) => {
  try {
    const response = await groupService.getFirstGroup();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

module.exports = router;
