import Donation from "../../models/donation/donations.js";

export const getDonationsById = async (req, res) => {
  try {
    const { donationsId } = req.params;

    const donations = await Donation.findById(donationsId)
      .populate("sender")
      .populate("receiver");

    if (!donations) {
      return res.status(404).json({ message: "donations by Id not found" });
    }

    res.status(200).json(donations);
  } catch (error) {
   console.error("Error fetching donation by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
