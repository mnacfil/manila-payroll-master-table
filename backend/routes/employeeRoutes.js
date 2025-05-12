var express = require("express");
var employeeService = require("../services/employeeService");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

module.exports = router;
