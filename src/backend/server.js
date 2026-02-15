import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Booking from "./models/Booking.js";
import User from "./models/User.js";
import nodemailer from "nodemailer";
import Place from "./models/Place.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error : ", err));

//  register
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already used" });

    const hash = await bcrypt.hash(password, process.env.SALT_ROUNDS);

    const user = new User({
      username,
      email,
      password: hash,
    });

    await user.save();

    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.EMAIL_SECRET_CODE,
      {
        expiresIn: "1d",
      },
    );

    const verificationLink = `https://jourflys.onrender.com/api/verify/${verificationToken}`;

    //  Send Email
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    });

    res.status(201).json({
      message: "Registered successfully. Please verify your email.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// mail verification send
app.get("/api/verify/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.EMAIL_SECRET_CODE);

    await User.findByIdAndUpdate(decoded.id, {
      isVerified: true,
    });

    res.send("✅ Email verified successfully. You can now login.");
  } catch (err) {
    res.status(400).send("❌ Invalid or expired token.");
  }
});

// login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user.isVerified)
      return res.status(401).json({
        error: "Please verify your email first",
      });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_CODE,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//user feedback
app.patch("/api/feedback", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET_CODE);

    const { message, rating } = req.body;

    if (!message || !rating)
      return res.status(400).json({ error: "All fields required" });

    await User.findByIdAndUpdate(
      decoded.id,
      {
        $push: {
          feedbacks: { message, rating },
        },
      },
      { new: true },
    );

    res.status(200).json({ message: "Feedback added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// get all places
app.get("/api/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//create email transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// verify config
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
      from: `Tour Booking <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
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

app.get("/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "Email working successfully",
    });

    res.send("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
    res.send("Email failed");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
