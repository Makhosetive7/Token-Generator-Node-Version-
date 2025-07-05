import Donation from "../../../models/donation/donations.js";

export const getTotalDonations = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();

    res.status(200).json({ totalDonations });
  } catch (error) {
    console.log("Failed fetching total donations count");
    res.status(500).json({ message: "server error" });
  }
};
