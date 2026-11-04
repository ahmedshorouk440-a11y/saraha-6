import { Router } from "express";

import {
    checkTwoStepAuth,
  ConfirmEmail,
  DeleteUser,
  enable2FA,
  GetAllUser,
  GetUserById,
  LoginAuth,
  LoginWithGoogle,
  Logout,
  RequestForgetPassword,
  resetforgetPassword,
  SignUp,
  UpdateAuth,
  verifyAndEnableTwoStep,
  VerifyForgetPassword,
} from "./Authanction.service.js";
import { auth } from "../../middleWare/Token.middleware/index.js";
import { SuccessResponce } from "../../common/Success/index.js";
import { upload } from "../../common/Multer/index.js";


const router = Router();
router.post("/SignUp", upload().single("image"), async (req, res, next) => {
  try {
    let data = await SignUp(req.body, req.file);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.patch("/Confirm_Email", async (req, res, next) => {
  try {
    let data = await ConfirmEmail(req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.post("/Verify-confirm-password", async (req, res, next) => {
  try {
    let data = await VerifyForgetPassword(req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.patch("/Reset-Forget-password", async (req, res, next) => {
  try {
    let data = await resetforgetPassword(req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.post("/Request-Forget-Password", async (req, res, next) => {
  try {
    let data = await RequestForgetPassword(req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.post("/auth/google", async (req, res, next) => {
  try {
    let data = await LoginWithGoogle(req.body.idToken);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.patch("/enable-2FA", auth, async (req, res) => {
  let data = await enable2FA(req.user);
  SuccessResponce({ res, data });
});

router.post("/signin-Confirmation", async (req, res) => {
  let data = await signinConfirmation(req.body);
  SuccessResponce({ res, data });
});
router.patch("/verify-enable-2FA", auth, async (req, res, next) => {
  try {
    let data = await verifyAndEnableTwoStep(req.user, req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.post("/Login", checkTwoStepAuth, async (req, res, next) => {
  try {
    let data = await LoginAuth(req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.get("/GetUserById", auth, async (req, res, next) => {
  try {
    let data = await GetUserById(req.user.id);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.patch("/UpdateUser", auth, async (req, res, next) => {
  try {
    let data = await UpdateAuth(req.user.id, req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.delete("/DeleteUser", auth, async (req, res, next) => {
  try {
    let data = await DeleteUser(req.user.id);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.get("/GetAlluser", auth, async (req, res, next) => {
  try {
    let data = await GetAllUser(req.query);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.post("/LogOut" ,auth ,async(req, res,next )=>{
  try{
   let data = await Logout(req.user)
   SuccessResponce({res , data})
  }catch(error){
    next(error)

  }
})

export default router;
