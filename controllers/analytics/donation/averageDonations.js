import Donations from "../../../models/donation/donations.js";

export const getAverageDonations = async (req, res) => {
  try {
    const averageDonation = await Donations.aggregate([
      {
        $group: {
          _id: null,
          avgKw: { $avg: "$amountInKw" },
        },
      },
    ]);

    res.status(200).json({averageDonation})
  } catch (error) {
    console.log("Failed to fetch average donations")
    res.status(500).json({message: "server error"})
  }
};
