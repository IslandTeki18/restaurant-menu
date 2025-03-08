const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  squareId: {
    type: String,
    required: [true, "Square ID is required"],
    unique: true,
  },
  name_en: {
    type: String,
    required: [true, "English name is required"],
  },
  name_es: {
    type: String,
    required: [true, "Spanish name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  availability: {
    type: Boolean,
    required: [true, "Availability is required"],
  },
  updatedAt: {
    type: Date,
    required: [true, "Updated date is required"],
  },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
