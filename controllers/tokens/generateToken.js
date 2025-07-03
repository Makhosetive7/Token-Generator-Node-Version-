import {
  generateSerielNumber,
  generateToken,
  calculateKwFromAmount,
  getTokenExpiryDate,
} from "../../utils/tokenUtils.js";
import User from "../../models/user.js";
import Token from "../../models/token.js";

export const generateTokens = async (req, res) => {
  try {
    const { accountNumber, amountPaid } = req.body;

    if (!accountNumber || !amountPaid) {
      return res.status(400).json({ message: "missing fields required" });
    }

    const foundUser = await User.findOne({ accountNumber });

    if (!foundUser || foundUser.role !== "tokenBuyer") {
      return res.status(404).json({ message: "Token buyer account not found" });
    }

    const kiloWatts = calculateKwFromAmount(amountPaid);
    const tokenCode = generateToken();
    const createdAt = new Date();
    const expiredAt = getTokenExpiryDate();
    const serielCode = generateSerielNumber();

    const newToken = new Token({
      accountNumber,
      amountPaid,
      tokenGenerated: tokenCode,
      serialNumber: serielCode,
      kiloWatts,
      createdAt,
      expiredAt,
      user: foundUser._id,
    });

    await newToken.save();

    // Update user balance
    foundUser.amountPaid += amountPaid;
    foundUser.kiloWatts += kiloWatts;
    await foundUser.save();

    res.status(201).json({
      message: "Token generated successfully",
      token: {
        tokenCode,
        kiloWatts,
        serialNumber: serielCode,
        createdAt,
        expiredAt,
      },
    });
  } catch (error) {
    console.error("Token generation failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
