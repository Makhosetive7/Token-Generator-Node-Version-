import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
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
  donationType: {
    type: String,
    enum: ["EDUCATION_SUPPORT", "FOOD_PROGRAM", "HEALTH_PROGRAM"],
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

export default mongoose.model("donations", donationSchema);
