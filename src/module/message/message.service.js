
import { BadRequestExption } from "../../common/Exption/index.js";
import { AuthModel } from "../../model/Authanction.model.js";
import { ConversationMessageModel, ConversationModel, IdentityRequestModel } from "../../model/index.js";
import { messageModel } from "../../model/message.model.js";
import mongoose from "mongoose";


export const GetAllMessage=async()=>{
    try{
    let data = await messageModel.find()
    if(data.length == 0){
        throw BadRequestExption("Message not Found")
    }
    return {
        message : "messages Found",
        data
    }
    }catch(error){
      next(error)
        
    }

}
export const SendMessage=async(body , file ,senderId)=>{
    let {Content , reciverId} = body
    let image
    let ExistUser = await AuthModel.findById(reciverId)
    if(!ExistUser){
        throw ({message : "User not found"})

    }
    if(file){
        image = file.path
    }
    let addedmessage = await messageModel.create({ Content, reciverId, image, senderId });

const result = addedmessage.toObject();
delete result.senderId;  
return result;

  if(!addedmessage){
    throw BadRequestExption({message : "message not sent"})

  }
  return addedmessage
}
export const getUrl=async(user)=>{

let userData = await AuthModel.findById(user.id)

const Url = `https://sara7a/${userData.uniqueName}`
return Url
}
export const GetUserData=async(body)=>{
   let {url} = body
   let  uniqueName = url.split('/').at(-1)
   let userData = await AuthModel.findOne({uniqueName})
   if(!userData){
    throw BadRequestExption({message: "user not Found"})
   }

   return {
     FullName: userData.FullName,
     uniqueName: userData.uniqueName,
   }
}
// export const GetUserMessages=async(user)=>{
//     try{
//   let message = await messageModel.find({reciverId:user.id})
//     if(message.length == 0){
//          throw BadRequestExption("no message Found")
//     }
//     return message

// }catch(error){
//        throw error
//     }

// }

export const GetUserMessages = async (user) => {
  try {
    let messages = await messageModel.find({ reciverId: user.id }).select("+senderId");
    if (messages.length == 0) {
      throw BadRequestExption("no message Found");
    }

    let result = [];
    for (let message of messages) {
      let request = await IdentityRequestModel.findOne({ messageId: message._id });

      let item = {
        _id: message._id,
        Content: message.Content,
        image: message.image,
        createdAt: message.createdAt,
      };

      if (request && request.status === "accepted") {
        let sender = await AuthModel.findById(message.senderId);
        item.sender = {
          FullName: sender.FullName,
          uniqueName: sender.uniqueName,
        };
      }

      result.push(item);
    }
    return result;
  } catch (error) {
    throw error;
  }
};



export const UpdateMessage = async (messageId, userId, body) => {
  const { Content } = body;

  if (!mongoose.isValidObjectId(messageId)) {
    throw BadRequestExption("Invalid message id");
  }

  const data = await messageModel.findOneAndUpdate(
    { _id: messageId, senderId: userId },
    { $set: { Content } },
    { new: true, runValidators: true }
  );


  if (!data) {
    throw BadRequestExption("Message not found or not allowed");
  }

  return data;
};
export const RequestIdentity=async(messageId , userId)=>{
   console.log("ID:", JSON.stringify(messageId), messageId.length);
  try{
    if(!mongoose.isValidObjectId(messageId)){
      throw BadRequestExption("Invalid message Id");

    }
    let message = await messageModel.findById(messageId).select("+senderId")
    if(!message){
      throw BadRequestExption("Message Not Found")
    }
     console.log("receiver:", String(message.reciverId), "| me:", String(userId));
    if(String(message.reciverId)!== String(userId)){
      throw BadRequestExption("Not Allowed to request this message identity")
    }
    let exist = await IdentityRequestModel.findOne({messageId})
     if(exist){
      throw BadRequestExption("Request already sent for this message")
     }
     let request = await IdentityRequestModel.create({
      messageId, 
      requesterId:userId,
      ownerId:message.senderId,
      status:"pending"
     })
     return {
    _id: request._id,
    messageId: request.messageId,
    status: request.status,
  }
  }catch(error){
    throw error
  }

}

export const GetRequest=async(userId)=>{
  try{
   let requests = await IdentityRequestModel.find({ownerId:userId}).populate("messageId", "Content image createdAt").populate("requesterId", "FullName uniqueName").select("-ownerId")
    if(requests.length == 0){
      throw BadRequestExption("No requests found")
    }
    return requests
  }catch(error){
    next(error)
  }

}

export const CreateConversation=async(request)=>{
   if(request.status !== "accepted"){
    throw BadRequestExption("Request must be accepted first")

   }
   let exist = await ConversationModel.findOne({requestId : request._id})
    if(exist){
      return exist
    }
    let conversation = await ConversationModel.create({
   participants: [request.ownerId, request.requesterId],
       messageId: request.messageId,
    requestId: request._id,

    });
    return conversation
  }

  export const ResponedToRequest=async(requestId, userId, status)=>{
 if(!mongoose.isValidObjectId(requestId)){
  throw BadRequestExption("Invalid request id");
 }
 if(!["accepted", "rejected"].includes(status)){
   throw BadRequestExption("status must be accepted or rejected")
 }
 let request = await IdentityRequestModel.findOne({_id: requestId, ownerId: userId })
  if(!request){
   throw BadRequestExption("Request not found or not allowed");

  }
  if(request.status !== "pending"){
        throw BadRequestExption(`Request already ${request.status}`);

  }
  request.status = status;
await request.save();
 
if (status == "rejected"){
      return { message: "Request rejected", request };

}
 let conversation = await CreateConversation(request);
  return { message: "Request accepted, conversation created", request, conversation };
};

export const SendConversationMessage=async(conversationId, userId, body)=>{
try{
  let {Content} = body;
  if(!mongoose.isValidObjectId(conversationId)){
    throw BadRequestExption("Invalid Conversation id")
  }
  let Conversation = await ConversationModel.findById(conversationId)
  if(!Conversation){
    throw BadRequestExption("Conversation Not Found")
  }
  if(!Conversation.participants.some((p)=> String(p)=== String(userId))){
    throw BadRequestExption("Not allowed to access this conversation")
  }
  if (!Content || !Content.trim()) {
    throw BadRequestExption("Content is required");
  }
  let data = await ConversationMessageModel.create({
     conversationId,
    senderId: userId,
    Content,
  })
  return data
}catch(error){
 throw error
}
}


export const GetConversationMessages=async(conversationId, userId)=>{
 try{

   if (!mongoose.isValidObjectId(conversationId)) {
     throw BadRequestExption("Invalid Conversation id");
    }
  let Conversation = await ConversationModel.findById(conversationId);
      if (!Conversation) {
      throw BadRequestExption("Conversation Not Found");
   }
     if (!Conversation.participants.some((p) => String(p) === String(userId))) {
     throw BadRequestExption("Not allowed to access this conversation");
    }
 let data = await ConversationMessageModel.find({ conversationId }).sort({ createdAt: -1 });
  return data
 }catch(error){
   throw error
}
 }

