import express from "express"
import { userAuth, userLogin } from "../controllers/usersController.js"

const router = express.Router()

router.route("/login").post(userLogin)
router.route("/auth").post(userAuth)

export default router
