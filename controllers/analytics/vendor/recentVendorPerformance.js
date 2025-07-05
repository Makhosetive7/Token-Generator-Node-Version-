import Vendor from "../../../models/vendor/vendor.js";

export const getRecentVendorPerformance = async (req, res) => {
  try {
    const vendorPerformance = await Vendor.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date(new Date() - 30 * 24 * 60 * 60 * 1000)), // last 30 days
          },
        },
      },
      {
        $group: {
          _id: "$vendorType",
          total: { $sum: "$amountInKw" },
        },
      },
    ]);
    res.status(200).json({ vendorPerformance });
  } catch (error) {
    console.log("Failed fetching recent vendor performance(statistics)");
    res.status(500).json({ message: "server error" });
  }
};
