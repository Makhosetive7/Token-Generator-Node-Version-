import Vendor from "../../../models/vendor/vendor.js";

export const getVendorDistribution = async (req, res) => {
  try {
    const purchaseDistribution = await Vendor.aggregate([
      {
        $group: {
          _id: "$vendorType",
          total: { $sum: "$amountInKw" },
        },
      },
    ]);

    res.status(200).json(purchaseDistribution);
  } catch (error) {
    console.log("Failed fetching vendor purchase distribution", error);
    res.status(500).json({ message: "server error" });
  }
};
