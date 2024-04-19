import "./Expense.css";
const TableTop = ({ toggleModal }) => {
  return (
    <div className="table-top">
      <h1>Last Transactions</h1>
      <button id="newTransaction" onClick={toggleModal}>
        + Add Transaction
      </button>
    </div>
  );
};

export default TableTop;
