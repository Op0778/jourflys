import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar({ token, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <h2>
        <img src={logo} alt="logo" />
      </h2>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`navList ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link to="/tours" onClick={() => setMenuOpen(false)}>
          Tours
        </Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <Link to="/feedback" onClick={() => setMenuOpen(false)}>
          Feedback
        </Link>
        <Link>
          {token ? (
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </button>
          )}
        </Link>
      </div>
    </nav>
  );
}
