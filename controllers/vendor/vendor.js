import User from "../../models/user.js";
import Vendor from "../../models/vendor.js";
import { vendorConversionRate } from "../../utils/vendorConstants.js";
import { VENDOR_TYPE_TO_ACCOUNT } from "../../utils/constants.js";

export const vendorPurchase = async (req, res) => {
  try {
    const { sender, amountInKw, vendorType } = req.body;

    if (!sender || !amountInKw || !vendorType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const receiverAccountNumber = VENDOR_TYPE_TO_ACCOUNT[vendorType];
    if (!receiverAccountNumber) {
      return res.status(400).json({ message: "Invalid vendor type" });
    }

    const senderAccount = await User.findOne({ accountNumber: sender });
    const receiverAccount = await User.findOne({ accountNumber: receiverAccountNumber });

    if (!senderAccount || !receiverAccount) {
      return res.status(404).json({ message: "Sender or receiver account not found" });
    }

    if (senderAccount.kiloWatts < amountInKw) {
      return res.status(400).json({ message: "Insufficient token balance" });
    }

    // Adjust token balances
    senderAccount.kiloWatts -= amountInKw;
    receiverAccount.kiloWatts += amountInKw;

    const convertedValue = amountInKw * vendorConversionRate;

    await senderAccount.save();
    await receiverAccount.save();

    // Save transaction in Vendor model
    const newPurchase = new Vendor({
      sender: senderAccount._id,
      receiver: receiverAccount._id,
      amountInKw,
      vendorType,
      convertedValue,
    });

    await newPurchase.save();

    return res.status(201).json({
      message: "Vendor purchase successful",
      purchase: newPurchase,
    });

  } catch (error) {
    console.error("Vendor purchase error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
