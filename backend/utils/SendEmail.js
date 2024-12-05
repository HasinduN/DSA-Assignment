// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hasinduit23@gmail.com", // Replace with your Gmail address
        pass: "Dilson258#",   // Replace with your App Password
      },
    });

    const mailOptions = {
      from: "hasinduit23@gmail.com", // Replace with your Gmail address
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw to handle errors where this function is called
  }
};
