import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ token, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <h2>
        <img src={logo} alt="logo" />
      </h2>

      <div className="navList">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/feedback">Feedback</Link>
        <Link>
          {token ? (
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </Link>
      </div>
    </nav>
  );
}
