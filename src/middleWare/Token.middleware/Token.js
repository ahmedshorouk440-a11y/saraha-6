

import jwt from "jsonwebtoken";
import { BadRequestExption, UnauthraziedExption } from "../../common/Exption/index.js";
import { get } from "../../common/Services/Cash/index.js";

export const revokeTokenKey = ({ id, jti }) =>
  `User::${id}::Revoke_Token::${jti}`;

const assertNotRevoked = async (verified) => {
  const revoked = await get({ key: revokeTokenKey(verified) });
  if (revoked) throw UnauthraziedExption("Token revoked");
};

export const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw BadRequestExption("token not found");
    }

    const [flag, token] = req.headers.authorization.split(" ");
    if (flag !== "Bearer" || !token) {
      throw BadRequestExption("Invalid Authorization");
    }

    const decoded = jwt.decode(token);
    if (!decoded) throw BadRequestExption("Invalid token");

    let signature;
    switch (decoded.aud) {
      case "admin":
        signature = process.env.ADMINSIGNATUR;
        break;
      case "user":
        signature = process.env.USERSIGNATUR;
        break;
      default:
        throw BadRequestExption("Invalid Audience");
    }

    const verified = jwt.verify(token, signature);
    await assertNotRevoked(verified);

    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};
