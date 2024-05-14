import { useState } from "react";
import NavigationBar from "./navigationBar";
import ScreenContent from "./ScreenContent";
import TodoListContent from "./ToDoList";
import PomodoroContent from "./pomodoro";
import ExpenseTracker from "./Expense/ExpenseTracker";
import "./homePage.css";

const HomePage = () => {
  const [Discover, setDiscover] = useState("popular");
  const [query, setQuery] = useState("");
  const [displayContent, setDisplayContent] = useState(null);

  const handleSetContent = (spanText) => {
    switch (spanText) {
      case "Todo List":
        setDisplayContent(<TodoListContent />);
        break;
      case "Pomodoro":
        setDisplayContent(<PomodoroContent />);
        break;
      case "ExpenseTracker":
        setDisplayContent(<ExpenseTracker />);
        break;
      default:
        setDisplayContent(null);
        break;
    }
    setDiscover(spanText);
  };

  return (
    <div className="homePage">
      <NavigationBar setDiscover={handleSetContent} />
      <div className="content">
        {displayContent ? (
          displayContent
        ) : (
          <ScreenContent Discover={Discover} query={query} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
