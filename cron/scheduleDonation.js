import cron from "node-cron";
import ScheduledDonations from "../models/scheduledDonations.js";
import User from "../models/user.js";
import Donations from "../models/donations.js";
import { DONATION_TYPE_TO_ACCOUNT } from "../utils/constants.js";
import { conversionRate } from "../utils/donations.js";

export const startScheduledDonations = () => {
  cron.schedule("* * * * *", async () => {
    const schedules = await ScheduledDonations.find({ isActive: true });

    for (const sched of schedules) {
      try {
        const sender = await User.findById(sched.user);
        const receiver = await User.findOne({
          accountNumber: DONATION_TYPE_TO_ACCOUNT[sched.donationType],
        });

        if (!sender || !receiver) {
          console.log("Sender or receiver not found.");
          continue;
        }

        if (sender.kiloWatts < sched.amountInKw) {
          console.log(`Insufficient balance for ${sender.email}`);
          continue;
        }

        sender.kiloWatts -= sched.amountInKw;
        receiver.kiloWatts += sched.amountInKw;

        await sender.save();
        await receiver.save();

        await Donations.create({
          sender: sender._id,
          receiver: receiver._id,
          amountInKw: sched.amountInKw,
          convertedValue: sched.amountInKw * conversionRate,
          donationType: sched.donationType,
        });

        console.log(`✅ Donation complete for ${sender.email}`);
      } catch (error) {
        console.error("❌ Error in scheduled donation:", error.message);
      }
    }
  });
};
