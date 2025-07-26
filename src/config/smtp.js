import eventEmitter from "events";
import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    logger.error(error, "Error in email configuration:");
  } else {
    logger.info("Email service is ready to send messages");
  }
});

export const emailEventEmitter = new eventEmitter();
emailEventEmitter.on("sendEmail", async ({
  to,
  subject,
  html,
}) => {
  try {
    await transporter.sendMail({
      from: process.env.GOOGLE_APP_EMAIL,
      to,
      subject,
      html,
    });
    logger.info("Email sent successfully");
  } catch (error) {
    logger.error(error, "Error sending email:");
  }
});