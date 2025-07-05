import express from "express";
import { login } from "../controllers/user/login.js";
import {register} from "../controllers/user/register.js"


const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

export default authRoute;