import Vendor from "../../../models/vendor/vendor.js";

export const getTotalVendorAmountInKw = async (req, res) => {
  try {
    const result = await Vendor.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amountInKw" } } },
    ]);
    res.status(200).json({ totalAmountInKw: result[0]?.totalAmount || 0 });
  } catch (error) {
    console.log("Failed to fetch total vendor amount in Kilowatts");
    res.status(500).json({ message: "server error" });
  }
};
