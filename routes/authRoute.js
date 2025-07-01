import express from "express";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;
