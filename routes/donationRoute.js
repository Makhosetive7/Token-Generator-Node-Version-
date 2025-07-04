import express from "express";
import { createDonation } from "../controllers/donations/donations.js";
import { getDonationHistory } from "../controllers/donations/donationHistory.js";
import { createScheduledDonations } from "../controllers/donations/scheduledDonations.js";
import { getUserScheduledDonations } from "../controllers/donations/userScheduledDonations.js";
import { deactivateSchedule } from "../controllers/donations/deactivateScheduledDonations.js";
import { getDonationsById } from "../controllers/donations/donationById.js";
import { getDonationsByAccountNumber } from "../controllers/donations/donationByAccountNumber.js";
import {getDonationByDonationType} from "../controllers/donations/donationsByDonationType.js"

const donationRoute = express.Router();

donationRoute.post("/createDonation", createDonation);
donationRoute.get("/:accountNumber/donationHistory", getDonationHistory);
donationRoute.post("/createScheduledDonation", createScheduledDonations);
donationRoute.get(
  "/:usedId/getUserScheduledDonation",
  getUserScheduledDonations
);
donationRoute.patch("/deactivate/:scheduleId", deactivateSchedule);
donationRoute.get("/donationById/:donationId", getDonationsById);
donationRoute.get("/donationsByAccountNumber/:accountNumber", getDonationsByAccountNumber);
donationRoute.get("/donationType/:donationType", getDonationByDonationType)

export default donationRoute;
