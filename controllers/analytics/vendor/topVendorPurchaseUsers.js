import Vendor from "../../../models/vendor/vendor.js";

export const getTopVendorPurchaseUsers = async (req, res) => {
  try {
    const topVendorUsers = await Vendor.aggregate([
      {
        $group: {
          _id: "$sender",
          purchaseCount: { $sum: 1 },
          totalKwSpent: { $sum: "$amountInKw" },
        },
      },
      { $sort: { purcharseCount: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json({ topVendorUsers });
  } catch (error) {
    console.error("Failed fetching top vendor purchase users", error);
    res.status(500).json({ message: "server error" });
  }
};
