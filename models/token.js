import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  tokenGenerated: {
    type: String,
    required: true,
    unique: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  kiloWatts: {
    type: Number,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Expired", "Used"],
    default: "Active",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("tokens", tokenSchema);
