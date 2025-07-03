import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database.js";
import { startScheduledDonations } from "./cron/scheduleDonation.js";

import authRoute from "./routes/authRoute.js";
import tokenRoute from "./routes/tokenRoutes.js";
import donationRoute from "./routes/donationRoute.js";
import vendorPurchaseRoute from "./routes/vendorRoute.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/tokens", tokenRoute);
app.use("/api/donations", donationRoute);
app.use("/api/purchase", vendorPurchaseRoute);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});

startScheduledDonations();

export default app;
