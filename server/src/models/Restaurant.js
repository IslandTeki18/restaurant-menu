const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  tables: {
    type: [Number],
    validate: {
      validator: function (v) {
        return v.every((table) => table > 0);
      },
      message: "Table numbers must be positive integers",
    },
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
