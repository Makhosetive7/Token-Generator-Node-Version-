import Vendor from "../../models/vendor/vendor.js";

export const getVendorPurchaseByVendorType = async (req, res) => {
  try {
    const { vendorType } = req.params;

    const purchase = await Vendor.find({ vendorType: vendorType.toUpperCase() })
      .populate("sender")
      .populate("receiver");

    res.status(200).json(purchase);
  } catch (error) {
    console.error("Error fetching by vendorType", error);
    res.status(500).json({ message: "Server error" });
  }
};
