import express from "express";
import { generateTokens } from "../controllers/token/generateToken.js";
import { createTransferToken } from "../controllers/token/tokenTransfer.js";
import { requestToken } from "../controllers/token/tokenRequest.js";
import { approveRejectTokenRequest } from "../controllers/token/approveOrRejectTokenRequest.js";
import { getTokensById } from "../controllers/token/tokenById.js";
import { getTokensByAccountNumber } from "../controllers/token/tokenGeneratedByAccountNumber.js";
import { getTokensByDate } from "../controllers/token/tokenByDateRange.js";

const tokenRoutes = express.Router();

tokenRoutes.post("/generateToken", generateTokens);
tokenRoutes.post("/transferToken", createTransferToken);
tokenRoutes.post("/tokenRequest", requestToken);
tokenRoutes.patch("/tokenRequest/:requestId", approveRejectTokenRequest);
tokenRoutes.get("/getTokenById/:tokenId", getTokensById);
tokenRoutes.get(
  "/getTokenByAccountNumber/:accountNumber",
  getTokensByAccountNumber
);
tokenRoutes.get("/getTokenByDateRange/:startDate/endDate", getTokensByDate);

export default tokenRoutes;
