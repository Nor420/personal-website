const express = require("express");
const cors = require("cors");
const { Firestore } = require("@google-cloud/firestore");
const sgMail = require("@sendgrid/mail");

const app = express();
const db = new Firestore({
  projectId: "personal-website-ron-9f777",
});

// SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Personal website backend is running.");
});

async function sendEmail(name, email, message) {
  const msg = {
    to: "ronmabulay@gmail.com",
    from: "ronmabulay@gmail.com", // Verify this sender in SendGrid
    subject: `New Contact Form - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #666; font-size: 12px;">This email was sent from your personal website contact form.</p>
      </div>
    `,
  };

  await sgMail.send(msg);
  console.log(`Email sent for message from ${name}`);
}

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required.",
      });
    }

    // Save to Firestore
    await db.collection("contact_messages").add({
      name,
      email,
      message,
      createdAt: new Date(),
      source: "personal-website",
    });

    // Send email notification (if API key is configured)
    if (process.env.SENDGRID_API_KEY) {
      await sendEmail(name, email, message);
    }

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