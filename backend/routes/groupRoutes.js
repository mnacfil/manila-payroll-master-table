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

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "Invalid Request, No id provided" });
    }
    const response = await groupService.getGroup(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ error: "Invalid Request, Please provide title" });
    }
    const response = await groupService.createGroup(req.body.title);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "Invalid Request, No id provided" });
    }
    const response = await groupService.deleteGroup(req.params.id);
    res.status(200).json({ success: response });
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: "Invalid Request, No id provided" });
    }
    const response = await groupService.updateGroup(req.params.id, req.body);
  } catch (error) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
});

module.exports = router;
