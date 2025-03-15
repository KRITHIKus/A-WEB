import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Response from "../models/Response.js"; // ✅ Import Response Model

dotenv.config(); // Load environment variables

// Ensure required environment variables are set
const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS", "RECIPIENT_EMAIL"];
const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
}

// ✅ Handle Response Submission
export const handleResponse = async (req, res) => {
  const { message, response } = req.body;

  // ✅ Validate input
  if (!response || (response !== "yes" && response !== "no")) {
    return res.status(400).json({ error: "Invalid response. Must be 'yes' or 'no'." });
  }

  try {
    // ✅ Store response in MongoDB first
    const newResponse = await Response.create({ response, message });
    console.log("✅ Response stored in DB:", newResponse);

    // ✅ Send Email after successful DB save
    await sendEmail(message, response);
    res.json({ success: true, message: "Response submitted and email sent!" });
  } catch (error) {
    console.error("❌ Error handling response:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// ✅ Email Sending Function
const sendEmail = async (message, response) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const subject = response === "yes" ? "She Accepted! 💖" : "She Did Not Accept 💔";
    const responseMessage =
      response === "yes"
        ? "Congratulations! She has accepted your proposal! 🎉"
        : "Unfortunately, she did not accept your proposal. Stay strong. ❤️";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject,
      text: `${responseMessage}\n\nMessage from her: ${message || "No message entered."}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
