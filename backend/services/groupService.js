const { pool, transaction } = require("../dbconfig");

async function getGroups() {
  const [result] = await pool.query(
    `SELECT 
      g.id AS group_id, 
      g.title AS group_title, 
      o.id AS option_id, 
      o.name AS option_name 
    FROM \`group\` g 
    LEFT JOIN \`option\` o ON g.id = o.group_id 
    ORDER BY g.title`
  );
  return result;
}

async function getGroup(id) {
  const [result] = await pool.query("SELECT * FROM `group` WHERE id = ?", [id]);
  if (!result[0]) {
    throw new Error("Group not found");
  }
  return result[0];
}

async function createGroup(title) {
  const [result] = await pool.query(
    "INSERT INTO `group` (id, title) VALUES(UUID(), ?)",
    [title]
  );
  return { id: result.insertId, title };
}

async function deleteGroup(id) {
  const [result] = await pool.query("DELETE FROM `group` WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw new Error("Group not found");
  }
  return result.affectedRows > 0;
}

async function updateGroup(id, newUpdates) {
  return transaction(async (connection) => {
    const [result] = await connection.query(
      "UPDATE `group` SET ? WHERE id = ?",
      [newUpdates, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Group do not exist");
    }

    const [groupResult] = await connection.query(
      "SELECT * FROM `group` WHERE id = ?",
      [id]
    );

    return groupResult[0];
  });
}

module.exports = {
  getGroups,
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
};
