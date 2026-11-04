import { Router } from "express";
import {
  GetAllMessage,
  GetConversationMessages,
  GetRequest,
  getUrl,
  GetUserData,
  GetUserMessages,
  RequestIdentity,
  ResponedToRequest,
  SendConversationMessage,
  SendMessage,
  UpdateMessage,
} from "./message.service.js";
import { auth } from "../../middleWare/Token.middleware/Token.js";
import { SuccessResponce } from "../../common/Success/index.js";

const router = Router();

router.get("/get-all-message", auth, async (req, res, next) => {
  try {
    let data = await GetAllMessage();
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.post("/Send-message", auth, async (req, res, next) => {
  try {
    let data = await SendMessage(req.body, req.file, req.user.id);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.get("/user-url", auth, async (req, res, next) => {
  try {
    const url = await getUrl(req.user);
    SuccessResponce({ res, data: { url } });
  } catch (error) {
    next(error);
  }
});
router.get("/User", async (req, res, next) => {
  let data = await GetUserData(req.body);
  SuccessResponce({ res, data });
});
router.get("/get-user-messages", auth, async (req, res, next) => {
  let User = await GetUserMessages(req.user);
  SuccessResponce({ res, message: "message Found", data: User });
});
router.patch("/Updated-message/:id", auth, async (req, res, next) => {
  try {
    let data = await UpdateMessage(req.params.id, req.user.id, req.body);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.post("/request-identity/:messageId", auth, async (req, res, next) => {
  try {
    let data = await RequestIdentity(req.params.messageId, req.user.id);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.get("/identity-requests", auth, async (req, res, next) => {
  try {
    let data = await GetRequest(req.user.id);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

router.patch("/identity-requests/:id", auth, async (req, res, next) => {
  try {
    let data = await ResponedToRequest(
      req.params.id,
      req.user.id,
      req.body.status,
    );
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});
router.post("/conversations/:id/messages" ,auth , async(req, res, next)=>{
  try{
    let data = await SendConversationMessage(req.params.id, req.user.id, req.body)
    SuccessResponce({res, data})
  }catch(error){
     next(error)
  }
})
router.get("/conversations/:id/messages", auth, async (req, res, next) => {
  try {
    let data = await GetConversationMessages(req.params.id, req.user.id);
    SuccessResponce({ res, data });
  } catch (error) {
    next(error);
  }
});

export default router;
