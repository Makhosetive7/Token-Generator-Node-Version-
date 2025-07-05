import Vendor from "../../models/vendor/vendor.js";

export const getVendorPurchaseById = async (req, res) => {
  try {
    const { purchaseId } = req.params;

    const vendorPurchase = await Vendor.findById(purchaseId)
      .populate("sender")
      .populate("receiver");

    if (!vendorPurchase) {
      return res.status(404).json({ message: "vendor purchase not found" });
    }

    res.status(200).json(vendorPurchase);
  } catch (error) {
    console.log("Failed to fetch vendor purchase by Id");
    res.status(500).json({ message: "server error" });
  }
};
