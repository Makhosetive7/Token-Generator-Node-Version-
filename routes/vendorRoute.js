import express from "express";
import { vendorPurchase } from "../controllers/vendor/vendor.js";
import { getVendorPurchaseHistory } from "../controllers/vendor/vendorHistory.js";
import { getVendorPurchaseById } from "../controllers/vendor/vendorPurchaseById.js";
import { getVendorPurchaseByDateRange } from "../controllers/vendor/vendorPurchaseDateRange.js";
import { getVendorPurchaseByVendorType } from "../controllers/vendor/vendorPurchaseByVendorType.js";
import { getTotalVendorPurchase } from "../controllers/analytics/vendor/totalVendorPurchase.js";
import { getTotalVendorAmountInKw } from "../controllers/analytics/vendor/totalVendorAmountInKw.js";
import { getTopVendorByAmount } from "../controllers/analytics/vendor/topVendorByAmount.js";
import { getAveragePurchasePerVendor } from "../controllers/analytics/vendor/averagePurchasePerVendor.js";
import { getMonthlyVendorTrends } from "../controllers/analytics/vendor/monthlyVendorTrends.js";
import { getTopVendorPurchaseUsers } from "../controllers/analytics/vendor/topVendorPurchaseUsers.js";
import { getVendorDistribution } from "../controllers/analytics/vendor/purchaseDistribution.js";
import { getRecentVendorPerformance } from "../controllers/analytics/vendor/recentVendorPerformance.js";

const vendorRoute = express.Router();

vendorRoute.post("/vendorPurchase", vendorPurchase);
vendorRoute.get(
  "/:accountNumber/vendorPurchaseHistory",
  getVendorPurchaseHistory
);
vendorRoute.get("/purchaseById/:purchaseId", getVendorPurchaseById);
vendorRoute.get(
  "/purchaseByDate/:startDate/:endDate",
  getVendorPurchaseByDateRange
);
vendorRoute.get("/vendorType/:vendorType", getVendorPurchaseByVendorType);
vendorRoute.get("/analytics/totalVendorPucharse", getTotalVendorPurchase);
vendorRoute.get("/analytics/totalVendorAmountInKw", getTotalVendorAmountInKw);
vendorRoute.get("/analytics/topVendorByAmount", getTopVendorByAmount);
vendorRoute.get(
  "/analytics/averagePurchasePerVendor",
  getAveragePurchasePerVendor
);
vendorRoute.get("/analytics/monthlyVendorTrend", getMonthlyVendorTrends);
vendorRoute.get("/analytics/topVendorPurchaseUser", getTopVendorPurchaseUsers);
vendorRoute.get(
  "/analytics/vendorPurcharseDistribution",
  getVendorDistribution
);
vendorRoute.get(
  "/analytics/recentVendorPerformance",
  getRecentVendorPerformance
);

export default vendorRoute;
