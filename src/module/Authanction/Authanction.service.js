
import {
  BadRequestExption,
  NotFoundException,
} from "../../common/Exption/Exption.js";
import { compare, hash } from "../../common/Hash/index.js";
import { generateToken } from "../../common/Services/Token.Services.js";
import { AuthModel } from "../../model/Authanction.model.js";
import jwt from "jsonwebtoken";

import { OAuth2Client } from "google-auth-library";

import { emailEvent } from "../../common/utiles/Email/email.event.js";
import { EmailSubjectEnum, ProviderEnum, REFRESH_TOKEN_EXPIRES_IN } from "../../common/Enum/enums.js";
import { createOtp } from "../../common/utiles/Email/otp.js";
import { del, get, set } from "../../common/Services/Cash/index.js";
import { sendEmail, UserEmailKey } from "../../common/utiles/send.email.js";
import { verifyEmailTemplete } from "../../common/utiles/Email/email.templates.js";
import { generateAndSendOtp } from "../../middleWare/generateAndSenOtp/generateOtp.js";

const client = new OAuth2Client();
async function verifyGoogleAccount(idToken) {
  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.WEB_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (error) {
    throw BadRequestExption("Invalid Google Account");
  }
  console.log("Google payload:", payload);
  if (!payload.email_verified) BadRequestExption("Email Not Verifed");
  return payload;
}

export const SignUp = async (body , file) => {
  const { FullName, age, email, password, uniqueName  } = body;
let profileImage;
if(file){
 profileImage = file?.path
}
  
  const emailExists = await AuthModel.findOne({ email });
  if (emailExists) throw BadRequestExption("User Aleardy exists");

 
  const nameExists = await AuthModel.findOne({ uniqueName });
  if (nameExists) throw BadRequestExption("unique name is aleardy exists");

  
  const data = await AuthModel.create({
    FullName,
    age,
    email,
    password: await hash(password),
    uniqueName,
     profileImage:profileImage
  });

  const code = createOtp();
  await set({
    key: UserEmailKey({ email, subject: EmailSubjectEnum.CONFIRM_EMAIL }),
    value: await hash(code.toString()),
    ttl: 120,
  });
  emailEvent.emit("sendEmail", {
    recipients: { to: email },
    subject: EmailSubjectEnum.CONFIRM_EMAIL,
    data: { code },
  });

  return data;
};

export const ConfirmEmail = async ({ otp, email }) => {
  email = email.toLowerCase().trim();

  const data = await AuthModel.findOne({
    email,
    provider: ProviderEnum.SYSTEM,
    confirmEmail: null,
  });
  if (!data) throw NotFoundException("Invalid Account");

  const redisKey = UserEmailKey({
    email,
    subject: EmailSubjectEnum.CONFIRM_EMAIL,
  });

  const hashOtp = await get({ key: redisKey });
  if (!hashOtp || !(await compare(String(otp), hashOtp))) {
    throw BadRequestExption("Invalid Otp");
  }

  data.confirmEmail = new Date();
  await data.save();
  await del({ key: redisKey });

  return { message: "Email Confirmed Successfully" };
};

export const VerifyForgetPassword = async ({ otp, email }) => {
  email = email.toLowerCase().trim();

  const data = await AuthModel.findOne({
    email,
    provider: ProviderEnum.SYSTEM,
    confirmEmail: { $ne: null },
  });
  if (!data) throw NotFoundException("Invalid Account");

  const redisKey = UserEmailKey({
    email,
    subject: EmailSubjectEnum.FORGET_PASSWORD,
  });

  const hashOtp = await get({ key: redisKey });
  if (!hashOtp || !(await compare(String(otp), hashOtp))) {
    throw BadRequestExption("Invalid Otp");
  }
  return data;

}

export const resetforgetPassword = async ({ otp, email, password }) => {
  const account = await VerifyForgetPassword({ otp, email });
  account.password = await hash(password);
  account.changeCredentialesTime = new Date();
  await account.save();
  await del({
    key: UserEmailKey({
      email: email.toLowerCase().trim(),
      subject: EmailSubjectEnum.FORGET_PASSWORD,
    }),
  });
  return { message: "Password reset successfully" };
};










export async function LoginWithGoogle(idToken) {
  const payload = await verifyGoogleAccount(idToken);

  let user = await AuthModel.findOne({ email: payload.email });
  if (!user) {
    user = await AuthModel.create({
      FullName: payload.name,
      email: payload.email,
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.USERSIGNATUR, {
    expiresIn: "1d",
  });

  return {
    user: { name: user.FullName, email: user.email, picture: payload.picture },
    token,
  };
}
export const LoginAuth = async (body) => {
 
  const { email, password } = body;

  const user = await AuthModel.findOne({
    email,
    provider: ProviderEnum.SYSTEM,
    confirmEmail: { $exists: true },
  });

  if (!user) {
    throw NotFoundException("User Email Is Not Found");
  }

  const match = await compare(password, user.password);
  if (!match) {
    throw BadRequestExption("Invalid Email Or Password");
  }

  const { AccessToken, RefreshToken } = await generateToken(user);

  return {
    message: "Login Successfully",
    accessToken: AccessToken,
    refreshToken: RefreshToken,
  };
};
export const RequestForgetPassword = async ({ email }) => {
  email = email.toLowerCase().trim();

  const account = await AuthModel.findOne({
    email,
    provider: ProviderEnum.SYSTEM,
    confirmEmail: { $ne: null },
  });
  if (!account) throw NotFoundException("Fail to find user account");
  const otp = String(await createOtp());

  
  await set({
    key: UserEmailKey({ email, subject: EmailSubjectEnum.FORGET_PASSWORD }),
    value: await hash(otp),
    ttl: 120,
  });

  await sendEmail({
    to: email,
    subject: "Forget Password",
    html: verifyEmailTemplete({
      subject: EmailSubjectEnum.FORGET_PASSWORD,
      title: "Reset Password",
      code: otp,
    }),
  });
  return { message: "Reset code sent" };
};
export const GetUserById = async (id) => {
  try {
    const user = await AuthModel.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};
export const UpdateAuth = async (id, body) => {
  try {
    let { FullName } = body;
    let user = await AuthModel.findOneAndUpdate(
      { _id: id },
      { $set: { FullName } },
      { new: true, runValidators: true },
    );
    return user;
  } catch (error) {
    throw error;
  }
};
export const DeleteUser = async (id) => {
  try {
    let user = await AuthModel.findOneAndDelete(id);
    return user;
  } catch (error) {
    throw error;
  }
};
export const GetAllUser = async (quary) => {
  try {
    let page = Number(quary.page);
    let limit = Number(quary.limit);

    if (!page || page < 1) page = 1;
    if (!limit || limit < 1) limit = 5;

    let skip = (page - 1) * limit;
    let data = await AuthModel.find().skip(skip).limit(limit);
    return {
      data,
      page,
      limit,
    };
  } catch (error) {
    throw error;
  }
};




export const enable2FA = async (user) => {
  const existUser = await AuthModel.findById(user.id);
  if (!existUser) throw NotFoundException("User not found");

  await generateAndSendOtp(existUser._id, existUser.email);
  return { message: "OTP sent to your email. Please verify to enable 2FA." };
};

export const verifyAndEnableTwoStep = async (user, body) => {
  const { otp } = body;
  const existUser = await AuthModel.findById(user.id);
  if (!existUser) throw NotFoundException("User not found");

  const redisOtp = await get({ key: `2fa::${existUser._id}` });
  if (!redisOtp || String(redisOtp) !== String(otp)) {
    throw BadRequestExption("OTP does not match");
  }

  existUser.isTwoStepVerified = true;
  await existUser.save();
  await del({ key: `2fa::${existUser._id}` });

  return { message: "2FA enabled successfully" };
};

export const signinConfirmation = async (body) => {
  const { userId, otp } = body;
  const existUser = await AuthModel.findById(userId);
  if (!existUser) throw NotFoundException("User not found");

  const redisOtp = await get({ key: `2fa::${userId}` });
  if (!redisOtp || String(redisOtp) !== String(otp)) {
    throw BadRequestExption("OTP does not match");
  }
  await del({ key: `2fa::${userId}` });

  const { AccessToken, RefreshToken } = await generateToken(existUser);
  return {
    message: "Login Successfully",
    accessToken: AccessToken,
    refreshToken: RefreshToken,
  };
};

export const checkTwoStepAuth = async (req, res, next) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const userData = await AuthModel.findOne({ email });
    if (!userData) {
      return next(BadRequestExption("User not found"));
    }

    if (userData.isTwoStepVerified) {
      await generateAndSendOtp(userData._id, userData.email);
      return res.status(200).json({
        message: "2FA required. Please check your email.",
        require2FA: true,
        userId: userData._id,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};


export const Logout=async(payload)=>{
  const consumedTime = (Math.ceil(Date.now()/ 1000) - payload.iat) 
  
  const ttl = REFRESH_TOKEN_EXPIRES_IN - consumedTime
  if (ttl > 0) {
    await set({
      key: `User::${payload.id}::Revoke_Token::${payload.jti}`,
      value: payload.jti,
      ttl,
    });
  }

  return { message: "Logout successfully" };
};