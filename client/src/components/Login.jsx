import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { Redirect } from 'react-router-dom';

import "../index.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.result && data.result._id.length) {
        localStorage.setItem("userData", JSON.stringify(data));
        setIsLoggedIn(true);
      }
      else{
        //set message data.message. Bring from backend
      }


    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (isLoggedIn && userData) {
      setIsLoggedIn(true);
      navigate("/homepage");
    }
    else{
      navigate("/login");
    }
    
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Navigate to="/homepage" />}
      <div className="login">
        <h2 className="login-title">LOGIN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="login-label">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="login-input"
          />
          <br />
          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
          />
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-p">
            Do not have an account?{" "}
            <span>
              <a href="/register"> Register</a>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
