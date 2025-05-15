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

module.exports = {
  getGroups,
};
