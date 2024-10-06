const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "dist")));

app.use(cors());
app.use(express.json());

//hTTtNeZNnokfmDga
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model("Email", emailSchema);

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in the database
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already stored" });
    }

    // Save new email if not already present
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: "Email saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving email", error: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("*.js", (req, res, next) => {
  res.setHeader("Content-Type", "application/javascript");
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
