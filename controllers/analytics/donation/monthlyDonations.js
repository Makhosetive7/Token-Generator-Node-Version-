import Donation from "../../../models/donation/donations.js";

export const getMonthlyDonations = async (req, res) => {
  try {
    const monthlyDonations = await Donation.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalKw: { $sum: "$amountInKw" },
          totalValue: { $sum: "$convertedValue" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({ monthlyDonations });
  } catch (error) {
    console.log("Failed fetching monthly donations");
    res.status(500).json({ message: "server error" });
  }
};
