var express = require("express");
var router = express.Router();
var employeeService = require("../services/employeeService");

router.get("/", async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await employeeService.getEmployee(req.params.id);
    if (!employee) {
      res.status(404).json({
        error: "Employee not found",
      });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    res.json({ success: result });
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.first_name || !req.body.last_name || !req.body.email) {
      res.status(400).json({ error: "Please fill up all required fields" });
    }
    const result = await employeeService.createEmployee(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error in creating employe. ", error);
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.post("/batch-delete", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      res.status(400).json({ success: false, error: "Invalid employee IDs" });
    }
    const result = await employeeService.deleteMultipleEmployee(ids);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

module.exports = router;
