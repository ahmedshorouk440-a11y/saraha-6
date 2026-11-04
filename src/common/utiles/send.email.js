
import nodemailer from "nodemailer";
import { BadRequestExption } from "../Exption/index.js";

export const UserEmailKey = ({ email, subject }) => {
  return `User::${email}::${subject}::OTP`;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.App_Password,
  },
});

export const sendEmail = async ({ to, cc, bcc, subject, text, html }) => {
  if (!to?.length && !cc?.length && !bcc?.length) {
    throw BadRequestExption("Missing Email Recipients");
  }
  if (!text?.length && !html?.length) {
    throw BadRequestExption("Missing Email Content");
  }

  return transporter.sendMail({
    from: `${process.env.APPLICATION_NAME} <${process.env.APP_EMAIL}>`,
    to,
    cc,
    bcc,
    subject,
    text,
    html,
  });
};