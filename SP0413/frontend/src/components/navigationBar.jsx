import { useState } from "react";
import "./navigationBar.css";
import Logo from "./../assets/logo.png";
function NavigationBar({ setDiscover }) {
  const [activeSpan, setActiveSpan] = useState("Articles");

  const handleSpanClick = (spanText) => {
    setActiveSpan(spanText);
    setDiscover(spanText);
  };

  return (
    <div className="vertical-nav-bar">
      <div className="logoblock">
        <img src={Logo} alt="logo style" className="logo" />
      </div>
      <ul>
        <div className="headerClass">
          <h3 className="discover">Discover</h3>
        </div>
        <li>
          <span
            className={activeSpan === "Articles" ? "active" : ""}
            onClick={() => handleSpanClick("Articles")}
          >
            Articles
          </span>
        </li>
        <li>
          <span
            className={activeSpan === "Todo List" ? "active" : ""}
            onClick={() => handleSpanClick("Todo List")}
          >
            To-Do List
          </span>
        </li>
        <li>
          <span
            className={activeSpan === "Pomodoro" ? "active" : ""}
            onClick={() => handleSpanClick("Pomodoro")}
          >
            Pomodoro
          </span>
        </li>
        <li>
          <span
            className={activeSpan === "ExpenseTracker" ? "active" : ""}
            onClick={() => handleSpanClick("ExpenseTracker")}
          >
            Expense Tracker
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NavigationBar;
