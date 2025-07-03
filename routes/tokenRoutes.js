import express from "express";
import { generateTokens } from "../controllers/tokens/generateToken.js";
import {createTransferToken} from "../controllers/tokens/tokenTransfer.js"
import {requestToken} from "../controllers/tokens/tokenRequest.js"
import {approveRejectTokenRequest} from "../controllers/tokens/approveOrRejectTokenRequest.js"

const tokenRoutes = express.Router();

tokenRoutes.post("/generateToken", generateTokens);
tokenRoutes.post("/transferToken", createTransferToken)
tokenRoutes.post("/tokenRequest", requestToken)
tokenRoutes.patch("/tokenRequest/:requestId", approveRejectTokenRequest);

export default tokenRoutes;
