import React from "react";
import "./SplashScreen.css";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/Register');
  };
  const handleClick2 = () => {
    navigate('/Login');
  }
  return (
    <div className="splash-screen">
      <div className="background-image" />
      <div className="center-elements">
        <h1 className="splash-text">Dhriti Travel Guide</h1>
        <br />
        <br />
        <div className="button-container">
          <button className="register-button" onClick={handleClick1}>Register
          </button>
          <br /><br />
          <button className="login-button" onClick={handleClick2}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
