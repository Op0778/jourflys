import { useState } from "react";
import axios from "axios";
import connectionUrl from "./url";
import "../styles/formStyle.css";

export default function Feedback() {
  const [form, setForm] = useState({
    message: "",
    rating: "",
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${connectionUrl}/api/feedback`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Feedback submitted successfully ✅");
      setForm({ message: "", rating: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting feedback");
    }
  };

  return (
    <div className="container-form">
      <h2 className="title-form">Give Your Feedback</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          required
        >
          <option value="">Select Rating</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button type="submit" className="button-form">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
