
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

export const generateToken = async (user) => {
  let aud, Signature, RefreshSignature;

  switch (user.role) {
    case "admin":
      Signature = process.env.ADMINSIGNATUR;
      RefreshSignature = process.env.ADMINREFRESHSIGNATURE;
      aud = "admin";
      break;
    default:
      Signature = process.env.USERSIGNATUR;
      RefreshSignature = process.env.USERREFRESHSIGNATURE;
      aud = "user";
  }

  const AccessToken = jwt.sign({ id: user._id }, Signature, {
    expiresIn: "30m",
    audience: aud,
    jwtid: randomUUID(),
  });

  const RefreshToken = jwt.sign({ id: user._id }, RefreshSignature, {
    expiresIn: "1y",
    audience: aud,
    jwtid: randomUUID(),
  });

  return { AccessToken, RefreshToken };
};