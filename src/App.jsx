import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (t, id, role) => {
    setToken(t);
    localStorage.setItem("token", t);
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  };

  return (
    <>
      <Navbar token={token} onLogout={handleLogout} />

      <Routes>
        {/* Protected Home */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

        {/* Protected Feedback */}
        <Route
          path="/feedback"
          element={
            token ? (
              <Feedback />
            ) : (
              <Navigate
                to="/login"
                state={{ from: { pathname: "/feedback" } }}
              />
            )
          }
        />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}
