import { Link } from "react-router-dom";
// import "./Navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2>
        <img src={logo} alt="" />
      </h2>
      <div className="navList">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
