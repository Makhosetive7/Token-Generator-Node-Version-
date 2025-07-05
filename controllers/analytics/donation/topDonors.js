import Donation from "../../../models/donation/donations.js";

export const getTopDonors = async (req, res) => {
  try {
    const topDonors = await Donation.aggregate([
      { $group: { _id: "$sender", totalKw: { $sum: "$amountInKw" } } },
      { $sort: { totalKw: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({topDonors})
  } catch (error) {
    console.log("Failed fetching top donors")
    res.status(500).json({message: "server error"})
  }
};
