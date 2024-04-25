const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  description: String,
  amount: Number,
  date: { type: String, default: Date.now },
  incomeOrExpense: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
