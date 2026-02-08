import { Link } from "react-router-dom";
// import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2>LocalTours</h2>
      <div className="navList">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
