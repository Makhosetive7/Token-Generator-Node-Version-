import Donations from "../../models/donation/donations.js";

export const getDonationByDonationType = async (req, res) => {
  try {
    const { donationType } = req.params;

    const donationMade = await Donations.find({ donationType: donationType.toUpperCase() })
      .populate("sender")
      .populate("receiver");

    res.status(200).json(donationMade);
  } catch (error) {
    console.error("Error fetching by vendorType", error);
    res.status(500).json({ message: "Server error" });
  }
};
