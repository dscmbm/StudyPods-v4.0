import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Expense.css";

const TransactionForm = ({ toggleModal, addTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomeOrExpense, setIncomeOrExpense] = useState("income");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description || !amount || !date) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    try {
      const formattedAmount =
        incomeOrExpense === "income"
          ? parseFloat(amount)
          : parseFloat(amount) * -1;

      const transaction = {
        description,
        amount: formattedAmount,
        date,
        incomeOrExpense,
      };

      // Sending POST request to add transaction
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        transaction,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      addTransaction(response.data);
      setDescription("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error("Error adding transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add transaction. Please try again later!",
      });
    }
  };

  return (
    <div className="modal">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="sr-only" htmlFor="description">
              Description
            </label>
            <input
              name="description"
              type="text"
              className="inputexp"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              id="amount"
              className="inputexp"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="buttons-income-expense">
            <button
              id="incomeButton"
              type="button"
              onClick={() => setIncomeOrExpense("income")}
              className={
                incomeOrExpense === "income"
                  ? "activexpi expbutton"
                  : "expbutton"
              }
            >
              Income
            </button>
            <button
              id="expenseButton"
              type="button"
              onClick={() => setIncomeOrExpense("expense")}
              className={
                incomeOrExpense === "expense"
                  ? "activexp expbutton"
                  : "expbutton"
              }
            >
              Expense
            </button>
          </div>

          <div className="input-group">
            <input
              className="inputexp"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="actions">
            <button type="submit" className="save">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
