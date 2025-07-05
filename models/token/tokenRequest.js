import mongoose from "mongoose";

const tokenRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }, // who should give
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }, // who requests
  amountInKw: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("tokenRequest", tokenRequestSchema);
