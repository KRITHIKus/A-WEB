import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to handle responses
router.post("/send-response", async (req, res) => {
  const { response, message } = req.body;

  // Validate input
  if (!response || (response !== "yes" && response !== "no")) {
    return res.status(400).json({ error: "Invalid response. Must be 'yes' or 'no'." });
  }

  // Customize email content based on the response
  const subject = response === "yes" ? "She Accepted! 💖" : "She Did Not Accept 💔";
  const responseMessage =
    response === "yes"
      ? "Congratulations! She has accepted your proposal! 🎉"
      : "Unfortunately, she did not accept your proposal. Stay strong. ❤️";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your email
    subject,
    text: `${responseMessage}\n\nMessage from her: ${message || "No additional message."}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Response email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

export default router;
