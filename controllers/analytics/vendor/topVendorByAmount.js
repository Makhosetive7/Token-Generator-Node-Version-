import Vendor from "../../../models/vendor/vendor.js";

export const getTopVendorByAmount = async (req, res) => {
  try {
    const topVendor = await Vendor.aggregate([
      {
        $group: {
          _id: "$vendorType",
          totalKw: { $sum: "$amountInKw" },
        },
      },
      { $sort: { totalKw: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(topVendor);
  } catch (error) {
    console.error("Failed getting top vendors by amount", error);
    res.status(500).json({ message: "Server error" });
  }
};
