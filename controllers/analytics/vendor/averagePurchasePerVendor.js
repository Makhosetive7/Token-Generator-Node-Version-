import Vendor from "../../../models/vendor/vendor.js";

export const getAveragePurchasePerVendor = async (req, res) => {
  try {
    const averagePurchase = await Vendor.aggregate([
      {
        $group: {
          _id: "$vendorType",
          averageKw: { $avg: "$amountInKw" },
        },
      },
      { $sort: { averageKw: -1 } },
    ]);
    res.status(200).json({ averagePurchase });
  } catch (error) {
    console.error("Error calculating average purchase per vendor", error);
    res.status(500).json({ message: "Server error" });
  }
};
