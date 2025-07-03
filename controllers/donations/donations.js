import User from "../../models/user.js";
import Token from "../../models/token.js";
import Donation from "../../models/donations.js";
import { conversionRate } from "../../utils/donations.js";
import { DONATION_TYPE_TO_ACCOUNT } from "../../utils/constants.js";

export const createDonation = async (req, res) => {
  try {
    const { sender, amountInKw, donationType } = req.body;

    if (!sender || !amountInKw || !donationType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const receiver = DONATION_TYPE_TO_ACCOUNT[donationType];
    if (!receiver) {
      return res.status(400).json({ message: "Invalid donation type" });
    }

    const senderAccount = await User.findOne({ accountNumber: sender });
    const receiverAccount = await User.findOne({ accountNumber: receiver });

    if (!senderAccount || !receiverAccount) {
      return res
        .status(400)
        .json({ message: "Sender or receiver account number not found" });
    }

    if (senderAccount.kiloWatts < amountInKw) {
      return res.status(400).json({ message: "Insufficient token balance" });
    }

    senderAccount.kiloWatts -= amountInKw;
    receiverAccount.kiloWatts += amountInKw;

    const convertedValue = amountInKw * conversionRate;

    await senderAccount.save();
    await receiverAccount.save();

    const newDonation = new Donation({
      sender: senderAccount._id,
      receiver: receiverAccount._id,
      amountInKw,
      donationType,
      convertedValue,
    });

    await newDonation.save();

    return res.status(201).json({
      message: "Donation successful",
      donation: newDonation,
    });
  } catch (error) {
    console.error("Donation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
