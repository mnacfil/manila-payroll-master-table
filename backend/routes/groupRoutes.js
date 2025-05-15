const express = require("express");
const router = express.Router();
const groupService = require("../services/groupService");

router.get("/", async (req, res) => {
  try {
    const groups = await groupService.getGroups();
    const groupOptions = groups.reduce((acc, curr) => {
      const { group_id, group_title, option_id, option_name } = curr;
      if (!acc[group_id]) {
        acc[group_id] = {
          id: group_id,
          title: group_title,
          options: [],
        };
      }

      if (option_id) {
        acc[group_id].options.push({
          id: option_id,
          name: option_name,
        });
      }

      return acc;
    }, {});
    res.status(200).json(Object.values(groupOptions));
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

module.exports = router;
