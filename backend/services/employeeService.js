const { pool, transaction } = require("../dbconfig");

async function getEmployees() {
  const [rows] = await pool.query("SELECT * from employee");
  return rows;
}

module.exports = {
  getEmployees,
};
