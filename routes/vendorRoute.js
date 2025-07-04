import express from "express";
import { vendorPurchase } from "../controllers/vendor/vendor.js";
import { getVendorPurchaseHistory } from "../controllers/vendor/vendorHistory.js";
import { getVendorPurchaseById } from "../controllers/vendor/vendorPurchaseById.js";
import { getVendorPurchaseByDateRange } from "../controllers/vendor/vendorPurchaseDateRange.js"
import {getVendorPurchaseByVendorType} from "../controllers/vendor/vendorPurchaseByVendorType.js"

const vendorRoute = express.Router();

vendorRoute.post("/vendorPurchase", vendorPurchase);
vendorRoute.get(
  "/:accountNumber/vendorPurchaseHistory",
  getVendorPurchaseHistory
);
vendorRoute.get("/purchaseById/:purchaseId", getVendorPurchaseById);
vendorRoute.get("/purchaseByDate/:startDate/:endDate", getVendorPurchaseByDateRange)
vendorRoute.get("/vendorType/:vendorType", getVendorPurchaseByVendorType);

export default vendorRoute;
