const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tables: {
    type: [Number],
    required: false,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
