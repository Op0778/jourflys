import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Booking from "./models/Booking.js";
import nodemailer from "nodemailer";
import Place from "./models/Place.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://omprakash:opMdu020@cluster0.txpzw.mongodb.net/tourism?retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error : ", err));

app.get("/api/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omprakash19092005@gmail.com", // ✅ your REAL Gmail process.env.EMAIL_USER
    pass: "ebvtnqnfsblmqvee", // ✅ 16-digit Gmail App Password  process.env.EMAIL_PASS
  },
});

// Optional: verify config once
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email config error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

app.post("/api/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    await transporter.sendMail({
      from: `"Tour Booking" <omprakash19092005@gmail.com>`, // must match user  process.env.EMAIL_USER
      to: "jourflys@gmail.com", // admin email process.env.ADMIN_EMAIL
      subject: "New Tour Booking Received 🚀",
      html: `
        <h2>New Booking</h2>
        <p><b>Name:</b> ${req.body.name}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Phone:</b> ${req.body.phone}</p>
        <p><b>Place:</b> ${req.body.place}</p>
        <p><b>Date:</b> ${req.body.date}</p>
      `,
    });

    res.json({
      success: true,
      message: "✅ Booking confirmed! We will contact you soon.",
    });
  } catch (err) {
    console.error("❌ Booking/Email error:", err);
    res.status(500).json({
      success: false,
      message: "❌ Booking failed. Email not sent.",
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
