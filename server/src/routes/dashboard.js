const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const TableAssignment = require("../models/TableAssignment");

const router = express.Router();

// GET /dashboard/waiter - Get assigned tables for the logged-in waiter
router.get(
  "/waiter/:waiter_id",
  authMiddleware,
  roleMiddleware("waiter"),
  async (req, res) => {
    try {
      const tables = await TableAssignment.find({ waiterId: req.params.waiter_id});
      res.json(tables);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// POST /dashboard/waiter/pickup - Pick up a table
router.post(
  "/waiter/pickup",
  authMiddleware,
  roleMiddleware("waiter"),
  async (req, res) => {
    const { tableNumber } = req.body;

    try {
      let table = await TableAssignment.findOne({ tableNumber });

      if (table) {
        return res.status(400).json({ msg: "Table already assigned" });
      }

      table = new TableAssignment({
        tableNumber,
        waiterId: req.user.id,
      });

      await table.save();
      res.json(table);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }
);

// POST /dashboard/waiter/release - Release a table
router.post(
  "/waiter/:waiter_id/release",
  authMiddleware,
  roleMiddleware("waiter"),
  async (req, res) => {
    const { tableNumber } = req.body;

    try {
      const table = await TableAssignment.findOneAndDelete({
        tableNumber,
        waiterId: req.user.id,
      });
      if (!table) {
        return res
          .status(400)
          .json({ msg: "Table not found or not assigned to you" });
      }

      res.json({ msg: "Table released" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// POST /table/:tableNumber/request - Request assistance
router.post("/table/:tableNumber/request", async (req, res) => {
  const { tableNumber } = req.params;

  // Mock WebSocket notification
  console.log(`Assistance requested at table ${tableNumber}`);

  res.json({ msg: `Assistance requested at table ${tableNumber}` });
});

module.exports = router;
