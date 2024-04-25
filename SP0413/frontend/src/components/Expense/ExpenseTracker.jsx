import { useState } from "react";
import TransactionList from "./TransactionList";
import BalanceDisplay from "./BalanceDisplay";
import TableTop from "./TableTop";
import Modal from "./Modal";
import "./Expense.css";
const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (index) => {
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <BalanceDisplay transactions={transactions} />
      <TableTop toggleModal={toggleModal} />
      {showModal && (
        <Modal toggleModal={toggleModal} addTransaction={addTransaction} />
      )}
      <TransactionList
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
    </div>
  );
};

export default ExpenseTracker;
