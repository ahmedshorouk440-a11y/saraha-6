
import mongoose, { Types } from "mongoose";

const ConversationMessageSchema = new mongoose.Schema({
  conversationId: { type: Types.ObjectId, ref: "Conversation", required: true },
  senderId:       { type: Types.ObjectId, ref: "Authanction", required: true },
  Content:        { type: String, required: true },
}, { timestamps: true });

export const ConversationMessageModel = mongoose.model("ConversationMessage", ConversationMessageSchema);