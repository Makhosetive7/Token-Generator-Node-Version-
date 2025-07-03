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
  vendorType: {
    type: String,
    required: false,
  },
  donationType: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    enum: ["tokenBuyer", "vendor", "donations", "admin"],
    default: "tokenBuyer",
  },
});

//hook to auto generate account number
userSchema.pre("validate", function (next) {
  if (!this.accountNumber) {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const namePart = this.firstName.substring(0, 3).toUpperCase();
    const randomPart = Math.floor(100 + Math.random() * 900);

    this.accountNumber = `${namePart}${datePart}${randomPart}`;
  }
  next();
});

export default mongoose.model("user", userSchema);
