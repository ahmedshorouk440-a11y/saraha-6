
import mongoose, { Types } from "mongoose";





const MessageSchema = new mongoose.Schema({
   Content :{
    type:String,
    required:true
   },
   reciverId:{type:Types.ObjectId,
   required:true,
   ref:"Authanction"},
   image:{
    type:String,
    required:false
   },uniqueName:{
    type:String
   }, 
   senderId: {
  type: Types.ObjectId,
  ref: "Authanction",
  select: false, 
},

},{timestamps:true})
export const messageModel = mongoose.model('Message', MessageSchema)