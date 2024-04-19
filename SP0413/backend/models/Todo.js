// models/Todo.js

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskInput: String,
  date: String,
  status: { type: String, default: "Pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

module.exports = mongoose.model("Todo", todoSchema);
