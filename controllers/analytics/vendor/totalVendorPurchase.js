import Vendor from "../../../models/vendor/vendor.js";

export const getTotalVendorPurchase = async (req, res) => {
  try {
    const totalVendorPurchases = await Vendor.countDocuments();

    res.status(200).json({totalVendorPurchases});
  } catch (error) {
    console.error("Failed to fetch total vendor purhase", error);
    res.status(500).json({ message: "server error" });
  }
};
