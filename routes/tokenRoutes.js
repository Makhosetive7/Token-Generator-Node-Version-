import express from "express";
import { generateTokens } from "../controllers/tokens/generateToken.js";

const tokenRoutes = express.Router();

tokenRoutes.post("/generateToken", generateTokens);

export default tokenRoutes;
