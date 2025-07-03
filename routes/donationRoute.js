import express from "express";
import { createDonation } from "../controllers/donations/donations.js";
import { getDonationHistory } from "../controllers/donations/donationHistory.js";
import { createScheduledDonations } from "../controllers/donations/scheduledDonations.js";
import { getUserScheduledDonations } from "../controllers/donations/userScheduledDonations.js";
import { deactivateSchedule } from "../controllers/donations/deactivateScheduledDonations.js";

const donationRoute = express.Router();

donationRoute.post("/createDonation", createDonation);
donationRoute.get("/:accountNumber/donationHistory", getDonationHistory);
donationRoute.post("/createScheduledDonation", createScheduledDonations);
donationRoute.get(
  "/:usedId/getUserScheduledDonation",
  getUserScheduledDonations
);
donationRoute.patch("/deactivate/:scheduleId", deactivateSchedule);

export default donationRoute;
