var express = require("express");
var router = express.Router();
var mysqlpool = require("../dbconfig");

async function getEmployees() {
  const [rows] = await mysqlpool.query("SELECT * FROM employee");
  return rows;
}

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const employees = await getEmployees();
    res.json(employees);
    res.send("Hello World!!!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
