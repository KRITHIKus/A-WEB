import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    response: {
      type: String,
      enum: ["yes", "no"], // Ensures only "yes" or "no" is stored
      required: true,
    },
    message: {
      type: String,
      default: "", // Optional message
    },
    createdAt: {
      type: Date,
      default: Date.now, // Auto timestamp
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;
