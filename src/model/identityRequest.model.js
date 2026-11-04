
import mongoose, { Types } from "mongoose";

const IdentityRequestSchema = new mongoose.Schema({
  messageId:   { type: Types.ObjectId, ref: "Message", required: true, unique: true },
  requesterId: { type: Types.ObjectId, ref: "Authanction", required: true }, 
  ownerId:     { type: Types.ObjectId, ref: "Authanction", required: true }, 
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });

export const IdentityRequestModel = mongoose.model("IdentityRequest", IdentityRequestSchema);