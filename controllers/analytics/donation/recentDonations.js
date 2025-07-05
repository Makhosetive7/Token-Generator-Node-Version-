import Donations from "../../../models/donation/donations.js";

export const getRecentDonations = async (req, res) => {
  try {
    const recent = await Donations.find({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({ recent });
  } catch (error) {
    console.log("Failed fetching recent donations");
    res.status(500).json({ message: "server error" });
  }
};
