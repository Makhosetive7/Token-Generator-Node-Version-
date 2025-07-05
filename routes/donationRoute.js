import express from "express";
import { createDonation } from "../controllers/donation/donations.js";
import { getDonationHistory } from "../controllers/donation/donationHistory.js";
import { createScheduledDonations } from "../controllers/donation/scheduledDonations.js";
import { getUserScheduledDonations } from "../controllers/donation/userScheduledDonations.js";
import { deactivateSchedule } from "../controllers/donation/deactivateScheduledDonations.js";
import { getDonationsById } from "../controllers/donation/donationById.js";
import { getDonationsByAccountNumber } from "../controllers/donation/donationByAccountNumber.js";
import {getDonationByDonationType} from "../controllers/donation/donationsByDonationType.js"
import {getTotalDonations} from "../controllers/analytics/donation/totalDonations.js"
import {getTotalDonatedKw} from "../controllers/analytics/donation/totalDonatedKw.js"
import {getMonthlyDonations} from "../controllers/analytics/donation/monthlyDonations.js"
import {getTotalDonationsByType} from "../controllers/analytics/donation/donationsByType.js"
import {getTopDonors} from "../controllers/analytics/donation/topDonors.js"
import {getRecentDonations} from "../controllers/analytics/donation/recentDonations.js"
import {getAverageDonations } from "../controllers/analytics/donation/averageDonations.js"

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
donationRoute.get("/analytics/totalDonations", getTotalDonations)
donationRoute.get("/analytics/totalDonatedKw", getTotalDonatedKw)
donationRoute.get("/analytics/monthlyDonations", getMonthlyDonations)
donationRoute.get("/analytics/totalDonationsByType", getTotalDonationsByType)
donationRoute.get("/analytics/topDonors", getTopDonors)
donationRoute.get("/analytics/recentDonations", getRecentDonations)
donationRoute.get("/analytics/averageDonations", getAverageDonations)

export default donationRoute;
