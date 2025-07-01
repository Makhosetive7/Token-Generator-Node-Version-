import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  kiloWatts: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    enum: ["houseHold", "admin"],
    default: admin,
  },
});

export default mongoose.model("user", userSchema);
