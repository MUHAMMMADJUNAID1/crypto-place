import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const navigate = useNavigate();

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }

      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <img className="logo" onClick={() => navigate("/")} src={logo} alt="" />

      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"#"}>
          <li>Features</li>
        </Link>

        <Link to={"#"}>
          <li>Pricing</li>
        </Link>

        <Link to={"#"}>
          <li>Blog</li>
        </Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler} name="" id="">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
