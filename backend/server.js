const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MongoDB Connection ---------------- */
mongoose.connect(process.env.MONGO_URI, {
  family: 4,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* ---------------- Mail Schema ---------------- */
const mailSchema = new mongoose.Schema({
  subject: String,
  message: String,
  emails: [String],
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const Mail = mongoose.model("Mail", mailSchema);

/* ---------------- Nodemailer Setup ---------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

/* ---------------- Test Route ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------------- Send Email Route ---------------- */
app.post("/send-email", async (req, res) => {
  const { subject, message, emails } = req.body;

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: emails,
      subject: subject,
      text: message,
    });

    // Save to MongoDB
    await Mail.create({
      subject,
      message,
      emails,
      status: "Sent"
    });

    res.status(200).send("Email Sent Successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to Send Email");
  }
});

/* ---------------- History Route ---------------- */
app.get("/history", async (req, res) => {
  try {
    const data = await Mail.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ---------------- Start Server ---------------- */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
