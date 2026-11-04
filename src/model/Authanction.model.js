
import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: true, trim: true },
    age: {
      type: Number,
      required: function () {
        return this.provider === "system";
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "system";
      },
    },
    provider: {
      type: String,
      enum: ["system", "google"],
      default: "system",
    },
    confirmEmail: { type: Date, default: null },
    uniqueName: { type: String, unique: true, trim: true },
     isTwoStepVerified: { type: Boolean, default: false },
    profileImage: { type: String, required: false }, 
  },
  { timestamps: true } 
);

export const AuthModel = mongoose.model("Authanction", AuthSchema);