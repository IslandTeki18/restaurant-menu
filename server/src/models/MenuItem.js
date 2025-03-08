const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  squareId: {
    type: String,
    required: true,
    unique: true,
  },
  name_en: {
    type: String,
    required: true,
  },
  name_es: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
