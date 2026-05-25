const express = require("express");
const cors = require("cors");
const { Firestore } = require("@google-cloud/firestore");

const app = express();
const db = new Firestore({
  projectId: "personal-website-ron-9f777",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Personal website backend is running.");
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required.",
      });
    }

    await db.collection("contact_messages").add({
      name,
      email,
      message,
      createdAt: new Date(),
      source: "personal-website",
    });

    return res.status(200).json({
      success: true,
      message: "Message saved successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error.",
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});