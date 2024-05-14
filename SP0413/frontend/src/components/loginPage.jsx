import { useState } from "react";
import axios from "axios";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleActive1 = () => {
    setIsActive(false);
  };
  const handleActive = () => {
    setIsActive(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signin",
        formData
      );
      console.log(response.data);
      const { token, redirectTo } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      alert("Sign In Failed!!");
      console.error(error.response.data);
    }
  };

  const handleClick1 = async (e) => {
    e.preventDefault();
    console.log("Sign In button clicked");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData
      );
      console.log(response.data);
    } catch (error) {
      alert("Sign In Failed!!");
      console.error(error.response.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="loginDiv">
        <div className="title">EduTasker</div>
        <div
          className={` ${
            isActive ? "containerL right-panel-active" : "containerL"
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={handleClick1}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                className="inputtext"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="inputemail"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="inputpass"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="buttonS" type="submit">
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleClick}>
              <h1>Sign In</h1>
              <span>or use your account</span>
              <input
                className="inputemail"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="inputpass"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="buttonS" type="submit">
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost buttonS"
                  id="signIn"
                  onClick={handleActive1}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello,Friend</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost buttonS"
                  id="signUp"
                  onClick={handleActive}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
