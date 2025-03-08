const express = require("express");
const {
  fetchSquareMenu,
  handleSquareWebhook,
} = require("../services/squareService");
const MenuItem = require("../models/MenuItem");
require("dotenv").config();

const router = express.Router();

// Endpoint to fetch and upsert Square menu items
router.get("/sync", async (req, res) => {
  try {
    const items = await fetchSquareMenu();
    for (const item of items) {
      await upsertMenuItem(item);
    }
    res.status(200).json({ msg: "Menu items synced successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Webhook endpoint to handle Square updates
router.post("/webhook", async (req, res) => {
  const signature = req.headers["x-square-signature"];
  const body = JSON.stringify(req.body);

  // Verify webhook signature
  if (signature !== process.env.SQUARE_WEBHOOK_SECRET) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    await handleSquareWebhook(req.body);
    res.status(200).json({ msg: "Webhook received" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
