import TransactionForm from "./TransactionForm";
import "./Modal.css";

const Modal = ({ toggleModal, addTransaction }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="eclose-button" onClick={toggleModal}>
            &times;
          </span>
          <h2>Add Transaction</h2>
          <TransactionForm addTransaction={addTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
