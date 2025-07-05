import Donation from "../../../models/donation/donations.js";

export const getTotalDonatedKw = async (req, res) => {
  try {
    const donatedKw = await Donation.aggregate([
      { $group: { _id: null, totalKw: { $sum: "$amountInKw" } } },
    ]);

    res.status(200).json({ donatedKw });
  } catch (error) {
    console.log("Failed fetching total donated kilowatts");
    res.status(200).json({ message: "server error" });
  }
};
