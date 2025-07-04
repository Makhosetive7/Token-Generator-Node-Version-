import Donations from "../../models/donations.js";

export const getDonationsByAccountNumber = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const donation = await Donations.findOne({ accountNumber }).populate(
      "sender"
    );

    if (!donation) {
      return res.status(404).json({ message: "Donations not found" });
    }

    res.status(200).json(donation);
  } catch (error) {
    console.log("Failed to locate donations by provided accoutn number", error);
    res.status(500).json({ message: "server error" });
  }
};
