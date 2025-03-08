const mongoose = require("mongoose");

const TableAssignmentSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: [true, "Table number is required"],
    min: [1, "Table number must be a positive integer"],
  },
  waiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Waiter ID is required"],
  },
});

module.exports = mongoose.model("TableAssignment", TableAssignmentSchema);
