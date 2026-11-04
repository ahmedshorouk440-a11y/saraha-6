
import mongoose, { Types } from "mongoose";

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: Types.ObjectId, ref: "Authanction", required: true }],
  messageId:    { type: Types.ObjectId, ref: "Message", required: true },
  requestId:    { type: Types.ObjectId, ref: "IdentityRequest", required: true, unique: true },
}, { timestamps: true });

export const ConversationModel = mongoose.model("Conversation", ConversationSchema);