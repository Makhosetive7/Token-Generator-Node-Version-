import ScheduledDonation from "../../models/donation/scheduledDonations.js";
import User from "../../models/user/user.js";

export const createScheduledDonations = async (req, res) => {
  try {
    const { userId, amountInKw, donationType, schedule } = req.body;

    if (!userId || !amountInKw || !donationType || !schedule) {
      return res
        .status(400)
        .json({ message: "all input fields needs to be filled" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "tokenBuyer") {
      return res.status(404).json({ message: "user not found or not allowed" });
    }

    const newSchedule = new ScheduledDonation({
      user: userId,
      amountInKw,
      donationType,
      schedule,
    });

    await newSchedule.save();

    res.status(201).json({
      message: "Scheduled donation created successfully",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("erroe creating a donation schedule", error);
    res.status(500).json({ message: "server error" });
  }
};
