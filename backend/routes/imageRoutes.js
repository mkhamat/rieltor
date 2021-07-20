import express from "express"
import {
  deleteImage,
  imageUpload,
  uploadImage,
} from "../controllers/imageController.js"
const router = express.Router()

router
  .route("/:id?/:image?")
  .post(imageUpload.array("image"), uploadImage)
  .delete(deleteImage)

export default router
