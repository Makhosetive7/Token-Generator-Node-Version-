import express from "express";
import { vendorPurchase } from "../controllers/vendor/vendor.js";
import { getVendorPurchaseHistory } from "../controllers/vendor/vendorHistory.js";

const vendorRoute = express.Router();

vendorRoute.post("/vendorPurchase", vendorPurchase);
vendorRoute.get("/:accountNumber/vendorPurchaseHistory", getVendorPurchaseHistory);

export default vendorRoute;
