import Vendor from "../../../models/vendor/vendor.js";

export const getMonthlyVendorTrends = async (req, res) => {
  try {
    const monthlyVendorTrends = await Vendor.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalPurchases: { $sum: "$amountInKw" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.status(200).json(monthlyVendorTrends);
  } catch (error) {
    console.error("Error fetching monthly vendor trends", error);
    res.status(500).json({ message: "Server error" });
  }
};
