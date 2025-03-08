const mongoose = require("mongoose");

const TableAssignmentSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  waiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("TableAssignment", TableAssignmentSchema);
