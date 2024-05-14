import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Expense.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceDisplay = () => {
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

  // Calculate total income and expense
  const getTotal = (type) =>
    transactions
      .filter((transaction) => transaction.incomeOrExpense === type)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

  const incomeTotal = getTotal("income");
  const expenseTotal = getTotal("expense");
  const total = incomeTotal + expenseTotal;

  // Data for the doughnut chart
  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Income vs Expense",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#28d39a", "#f54e4e"],
        borderColor: ["#45474b", "#45474b"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div id="balance">
        <div className="cardExp">
          <h3 className="epxh3">
            <span className="spanexp">Incomes:</span>
          </h3>
          <p>₹&nbsp; {incomeTotal.toFixed(2)}</p>
        </div>
        <div className="cardExp">
          <h3 className="epxh3">
            <span className="spanexp">Expenses: </span>
          </h3>
          <p>₹&nbsp; {expenseTotal.toFixed(2)}</p>
        </div>
        <div className="cardExp total">
          <h3 className="epxh3">
            <span className="spanexpt">Total: </span>
          </h3>
          <p>₹&nbsp; {total.toFixed(2)}</p>
        </div>
        <div
          style={{
            backgroundColor: "#eee",
            width: "360px",
            height: "360px",
            borderRadius: "10px",
          }}
        >
          <h2>Chart | Balance</h2>
          <Doughnut data={chartData} />
        </div>
      </div>
    </>
  );
};

export default BalanceDisplay;
