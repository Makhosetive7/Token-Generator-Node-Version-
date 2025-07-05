import User from "../../models/user/user.js";
import Vendor from "../../models/vendor/vendor.js";

export const getVendorPurchaseHistory = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const vendorPurchase = await Vendor.find({ sender: user._id })
      .populate("receiver", "firstName lastName accountNumber")
      .sort({ createdAt: -1 });
    res.status(200).json({ vendorPurchase });
  } catch (error) {
    console.error("failed to reach vendor purchase error");
    res.status(500).json({ message: "server error" });
  }
};
