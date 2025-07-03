import express from "express";
import { createDonation } from "../controllers/donations/donations.js";
import { getDonationHistory } from "../controllers/donations/donationHistory.js";

const donationRoute = express.Router();

donationRoute.post("/createDonation", createDonation);
donationRoute.get("/:accountNumber/donationHistory", getDonationHistory);

export default donationRoute;
