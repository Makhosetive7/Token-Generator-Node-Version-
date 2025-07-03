import User from "../../models/user.js";  
import TokenRequest from "../../models/tokenRequest.js";
import { TOKEN_REQUEST_TO_ACCOUNT } from "../../utils/constants.js";

export const requestToken = async (req, res) => {
  try {
    const { from, to, amountInKw, purpose } = req.body;

    
    if (!from || !to || !amountInKw || !purpose) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    
    const beggar = await User.findOne({ accountNumber: to });
    const goodSamaritan = await User.findOne({ accountNumber: from });

    if (!beggar || !goodSamaritan) {
      return res.status(400).json({ message: "Sender or receiver not found" });
    }

    // Create new token request document
    const newRequest = new TokenRequest({
      from: goodSamaritan._id,
      to: beggar._id,
      amountInKw,
      purpose,
      status: "Pending",
      createdAt: new Date(),
    });

    // Save to DB
    await newRequest.save();

    // Respond success
    res.status(201).json({
      message: "Token request created successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error creating token request:", error);
    res.status(500).json({ message: "Server error" });
  }
};
