import User from "../../models/user/user.js";
import Donation from "../../models/donation/donations.js";

export const getDonationHistory = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const donations = await Donation.find({ sender: user._id })
      .populate("receiver", "firstName lastName accountNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({ donations });
  } catch (error) {
    console.error("Failed to fetch donation history", error);
    res.status(500).json({ message: "server error" });
  }
};
