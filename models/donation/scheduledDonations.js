import mongoose from "mongoose";

const scheduledDonationsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amountInKw: {
    type: Number,
    required: true,
  },
  donationType: {
    type: String,
    enum: ["EDUCATION_SUPPORT", "FOOD_PROGRAM", "HEALTH_PROGRAM"],
    required: true,
  },
  schedule: {
    type: String, // cron format like "0 0 1 * *" for 1st of every month
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("scheduledDonations", scheduledDonationsSchema);
