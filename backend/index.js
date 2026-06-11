const express = require("express");
const cors = require("cors");
const { Firestore } = require("@google-cloud/firestore");
const sgMail = require("@sendgrid/mail");
const rateLimit = require("express-rate-limit");
const xss = require("xss");

const app = express();

// Firestore
const db = new Firestore({
  projectId: "personal-website-ron-9f777",
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =========================
// ENV CHECK (IMPORTANT)
// =========================
if (!process.env.SENDGRID_API_KEY) {
  console.warn("⚠️ WARNING: SENDGRID_API_KEY is NOT set. Emails will NOT be sent.");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// =========================
// CORS CONFIG
// =========================
app.use(cors({
  origin: [
    "https://ronm.online",
    "https://www.ronm.online",
    "https://personal-website-ron-9f777.web.app"
  ]
}));

app.use(express.json());

// =========================
// RATE LIMITING
// =========================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: "Too many requests. Try again later." }
});

app.use("/api/", limiter);

// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
  res.send("Personal website backend is running. Use /health or /api/contact");
});

// =========================
// HEALTH CHECK
// =========================
app.get("/health", async (req, res) => {
  try {
    await db.collection("_test").limit(1).get();
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: error.message
    });
  }
});

// =========================
// EMAIL FUNCTION
// =========================
async function sendEmailNotification(name, email, message) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("📩 Skipping email (SendGrid not configured)");
    return;
  }

  const msg = {
    to: "mabulayron420@gmail.com",
    from: process.env.SENDGRID_SENDER_EMAIL || "mabulayron420@gmail.com",
    subject: `New Contact Form - ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
    html: `
      <div style="font-family: Arial; max-width: 600px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p style="white-space: pre-wrap; background:#f5f5f5; padding:10px;">
          ${message}
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("📧 Email sent successfully");
  } catch (err) {
    console.error("❌ SendGrid Error:", err.response?.body || err.message);
  }
}

// =========================
// CONTACT API
// =========================
app.post("/api/contact", async (req, res) => {
  console.log("📥 /api/contact HIT");

  try {
    const { name, email, message } = req.body;

    // Sanitize
    const sanitizedName = xss((name || "").trim());
    const sanitizedEmail = xss((email || "").trim());
    const sanitizedMessage = xss((message || "").trim());

    // Validate required fields
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required."
      });
    }

    // Validate email
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format."
      });
    }

    // Length checks
    if (
      sanitizedName.length > 100 ||
      sanitizedEmail.length > 100 ||
      sanitizedMessage.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        error: "Input too long."
      });
    }

    // Save to Firestore
    await db.collection("contact_messages").add({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      createdAt: new Date(),
      source: "personal-website"
    });

    console.log("💾 Saved to Firestore");

    // Send email (truly non-blocking — don't wait for it)
    sendEmailNotification(sanitizedName, sanitizedEmail, sanitizedMessage).catch(err =>
      console.error("Email notification failed:", err)
    );

    return res.status(200).json({
      success: true,
      message: "Message received successfully."
    });

  } catch (error) {
    console.error("🔥 Contact API Error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error."
    });
  }
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});