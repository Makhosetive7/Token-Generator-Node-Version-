import Vendor from "../../models/vendor/vendor.js";

export const getVendorPurchaseByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    const vendorPurchase = await Vendor.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json(vendorPurchase);
  } catch (error) {
    console.log("Failed to get vendor purchase by date range", error);
    res.status(500).json({ message: "server error" });
  }
};
