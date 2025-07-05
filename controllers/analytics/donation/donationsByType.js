import Donation from "../../../models/donation/donations.js";

export const getTotalDonationsByType = async (req, res) => {
  try {
    const donationsByType = await Donation.aggregate([
      {
        $group: {
          _id: "$donationType",
          totalKw: { $sum: "$amountInKw" }, 
          totalValue: { $sum: "$convertedValue" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({ donationsByType });
  } catch (error) {
    console.log("Failed fetching total donations by type", error);
    res.status(500).json({ message: "server error" });
  }
};
