import { set } from "../../common/Services/Cash/index.js";
import { sendEmail } from "../../common/utiles/send.email.js";

export const generateAndSendOtp = async (userId, email) => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  await set(`2fa::${userId}`, otp, 180);
  await sendEmail({
    to: email,
    subject: "Verification Code",
    html: `<h1>Your OTP is: ${otp}</h1>`,
  });
};