import express from "express"
import {
  getAppartments,
  getAppartment,
  addAppartment,
  removeAppartment,
  updateAppartment,
} from "../controllers/appartmentController.js"
const router = express.Router()

router.route("/new").post(addAppartment)
router.route("/delete/:id").delete(removeAppartment)
router.route("/edit/:id").put(updateAppartment)
router.route("/:id?").post(getAppartments).get(getAppartment)

export default router
