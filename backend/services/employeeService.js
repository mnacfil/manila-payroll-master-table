const { pool, transaction } = require("../dbconfig");

async function getEmployees() {
  const [result] = await pool.query("SELECT * from employee");
  return result;
}

async function getEmployee(id) {
  const [result] = await pool.query("SELECT * from employee WHERE emp_id = ?", [
    id,
  ]);
  return result[0] || null;
}

async function deleteEmployee(id) {
  const [result] = await pool.query("DELETE FROM employee WHERE emp_id = ?", [
    id,
  ]);
  if (result.affectedRows === 0) {
    throw new Error("Employee not found");
  }
  return result.affectedRows > 0;
}
async function createEmployee(data) {
  const [result] = await pool.query("INSERT INTO employee SET ?", [data]);
  return { id: result?.insertId, ...data };
}

async function updateEmployee(id, newUpdates) {
  return transaction(async (connection) => {
    const [result] = await connection.query(
      "UPDATE employee SET ? WHERE emp_id = ?",
      [newUpdates, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Employee not found");
    }

    return getEmployee(id);
  });
}

async function deleteMultipleEmployee(ids) {
  if (!Array.isArray(ids)) {
    throw new Error("Ids must be an array");
  }
  if (ids.length === 0) {
    return {
      success: false,
      message: "Please selected employees to delete.",
    };
  }
  return transaction(async (connection) => {
    const placeholders = ids.map(() => "?").join(",");
    const [result] = await connection.query(
      `DELETE FROM employee WHERE emp_id IN (${placeholders})`,
      ids
    );
    return {
      success: true,
      count: result.affectedRows,
    };
  });
}

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  deleteMultipleEmployee,
};
