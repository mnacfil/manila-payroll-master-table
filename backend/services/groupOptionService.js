const crypto = require("crypto");
const { pool, transaction } = require("../dbconfig");
const groupService = require("./groupService");

async function getGroupOptions(groupId) {
  await groupService.getGroup(groupId);
  const [result] = await pool.query(
    "SELECT * FROM `option` WHERE group_id = ?",
    [groupId]
  );
  return result;
}

async function createGroupOption(groupId, { code_id, name, description }) {
  const res = await groupService.getGroup(groupId);
  const uuid = crypto.randomUUID();
  await pool.query(
    `
            INSERT INTO \`option\` (\`id\`, \`code_id\`, \`name\`, \`description\`, \`group_id\`)
            SELECT
                ?,
                ?,
                ?,
                ?,
                id
            FROM \`group\`
            WHERE title = ?
        `,
    [uuid, code_id, name, description, res.title]
  );
  return { id: uuid, code_id, name, description };
}

async function deleteGroupOption(groupId, optionId) {
  await groupService.getGroup(groupId);
  const [result] = await pool.query("DELETE FROM `option` WHERE id = ?", [
    optionId,
  ]);
  if (result.affectedRows === 0) {
    throw new Error("Group option do not exist");
  }
  return result.affectedRows > 0;
}

async function updateGroupOption(groupId, optionId, newUpdates) {
  return transaction(async (connection) => {
    await groupService.getGroup(groupId);
    const [result] = await connection.query(
      "UPDATE `option` SET ? WHERE id = ?",
      [newUpdates, optionId]
    );
    if (result.affectedRows === 0) {
      throw new Error("Group option do not exist");
    }

    const [optionResult] = await connection.query(
      "SELECT * FROM `option` WHERE id = ?",
      [optionId]
    );

    return optionResult[0];
  });
}

module.exports = {
  getGroupOptions,
  createGroupOption,
  deleteGroupOption,
  updateGroupOption,
};
