import ScheduledDonation from "../../models/donation/scheduledDonations.js";

export const deactivateSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;

    const schedule = await ScheduledDonation.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "scheduled donations not found" });
    }

    schedule.isActive = false;
    await schedule.save();

    res
      .status(200)
      .json({ message: "schedule donation activated successfully" });
  } catch (error) {
    console.error("Deactivate error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
