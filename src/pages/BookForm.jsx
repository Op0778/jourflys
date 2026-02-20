import React, { useState } from "react";
import "../styles/formStyle.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    date: "",
    access_key: "cdad100e-d388-426a-bea6-e5ad1184a8b8",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Please wait...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.status === 200) {
        setResult(json.message);
      } else {
        setResult(json.message || "Something went wrong!");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        place: "",
        date: "",
        access_key: "cdad100e-d388-426a-bea6-e5ad1184a8b8",
      });

      setTimeout(() => {
        setResult("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setResult("Something went wrong!");
    }
  };

  return (
    <div className="container-form">
      <h2 className="title-form">Book Your Trip </h2>

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
          placeholder="Your Location"
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

        <input type="submit" value="Submit" />
        <p>{result}</p>
      </form>
    </div>
  );
};

export default Contact;
