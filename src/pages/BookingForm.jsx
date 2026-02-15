import axios from "axios";
import React, { useState } from "react";
import connectionUrl from "./url";
import "../styles/formStyle.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${connectionUrl}/api/book`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Axios already gives parsed JSON in res.data
      setMessage(res.data.message || "Booking successful!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        place: "",
        date: "",
      });
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "❌ Server error. Try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <h2 className="title-form">Book Your Trip ✈️</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="place"
          placeholder="Destination"
          value={formData.place}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading} className="button-form">
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>

      {message && <p className="message-form">{message}</p>}
    </div>
  );
};

// const styles = {
//   container: {
//     maxWidth: "420px",
//     margin: "40px auto",
//     padding: "24px",
//     borderRadius: "12px",
//     background: "#ffffff",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "16px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     outline: "none",
//     fontSize: "14px",
//   },
//   button: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#1E88E5",
//     color: "#fff",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   message: {
//     textAlign: "center",
//     marginTop: "12px",
//     color: "#2E7D32",
//   },
// };

export default BookingForm;
