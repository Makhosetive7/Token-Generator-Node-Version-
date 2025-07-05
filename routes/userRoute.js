import express from "express"
import {getUserById} from "../controllers/user/userById.js"
import {getUserByAccountNumber} from "../controllers/user/userByAccountNumber.js"

const userRoute = express.Router()

userRoute.get("/userById/:userId", getUserById)
userRoute.get("/userByAccountNumber/:accountNumber", getUserByAccountNumber)

export default userRoute;