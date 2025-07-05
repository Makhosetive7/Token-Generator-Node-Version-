import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amountInKw: {
    type: Number,
    required: true,
  },
  convertedValue: {
    type: Number,
    default: 0,
  },
  vendorType: {
    type: String,
    enum: ["PICK_AND_PAY", "EDGARS", "SUPERMED_PHARMACY"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  referenceToken: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tokens",
    default: null,
  },
});

export default mongoose.model("vendor", vendorSchema);
