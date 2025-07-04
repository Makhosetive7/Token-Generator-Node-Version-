import express from "express";
import { generateTokens } from "../controllers/tokens/generateToken.js";
import { createTransferToken } from "../controllers/tokens/tokenTransfer.js";
import { requestToken } from "../controllers/tokens/tokenRequest.js";
import { approveRejectTokenRequest } from "../controllers/tokens/approveOrRejectTokenRequest.js";
import { getTokensById } from "../controllers/tokens/tokenById.js";
import { getTokensByAccountNumber } from "../controllers/tokens/tokenGeneratedByAccountNumber.js";
import { getTokensByDate } from "../controllers/tokens/tokenByDateRange.js";

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
