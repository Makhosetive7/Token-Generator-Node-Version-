import ScheduledDonation from "../../models/scheduledDonations.js";

export const getUserScheduledDonations = async (req, res) => {
  try {
    const { userId } = req.params;

    const schedules = await ScheduledDonation.find({
      user: userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Active scheduled donations",
      count: schedules.length,
      schedules,
    });
  } catch (error) {
    console.error("Error fetching schedules:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
