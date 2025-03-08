const express = require("express");
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// GET /menu/:restaurantId
router.get("/:restaurantId", async (req, res) => {
  const { lang } = req.query;

  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    const menuItems = await MenuItem.find({
      restaurantId: req.params.restaurantId,
    });

    const translatedMenuItems = menuItems.map((item) => {
      return {
        ...item._doc,
        name: lang === "es" ? item.name_es : item.name_en,
      };
    });

    res.json(translatedMenuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
