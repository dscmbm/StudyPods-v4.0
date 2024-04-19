import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
