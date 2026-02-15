import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import connectionUrl from "../pages/url";
import "../styles/formStyle.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${connectionUrl}/api/login`, form);

      const token = res.data.token;
      const userId = res.data.user._id;
      const role = res.data.user.role;

      onLogin(token, userId, role);

      // 🔥 Redirect back to previous page (like feedback)
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h2 className="title-form">Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" className="button-form">
          Login
        </button>
        <div className="relink">
          already Have an Account? <Link to="/register">Register Now</Link>
        </div>
      </form>
    </div>
  );
}
