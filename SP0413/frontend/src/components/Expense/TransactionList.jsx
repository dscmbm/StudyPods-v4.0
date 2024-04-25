import { useState, useEffect } from "react";
import axios from "axios";
import "./Expense.css";

const TransactionList = ({ removeTransaction }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const deleteTransaction = async (index, id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTransactions = [...transactions];
      updatedTransactions.splice(index, 1);
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  return (
    <div className="table-container">
      <table id="data-table" className="tablexp">
        <thead>
          <tr>
            <th className="thexp">Description</th>
            <th className="thexp">Amount</th>
            <th className="thexp">Date</th>
            <th className="thexp">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="tdxp">{transaction.description}</td>
              <td
                className={
                  transaction.incomeOrExpense === "income"
                    ? "tdxp income"
                    : "tdxp expense"
                }
              >
                ₹&nbsp; {transaction.amount.toFixed(2)}
              </td>
              <td className="tdxp">{transaction.date}</td>
              <td className="tdxp">
                <button
                  className="expclose-button"
                  onClick={() => deleteTransaction(index, transaction._id)}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
