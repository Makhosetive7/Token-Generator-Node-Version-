import express from "express"
import {getUserById} from "../controllers/users/userById.js"
import {getUserByAccountNumber} from "../controllers/users/userByAccountNumber.js"

const userRoute = express.Router()

userRoute.get("/userById/:userId", getUserById)
userRoute.get("/userByAccountNumber/:accountNumber", getUserByAccountNumber)

export default userRoute;