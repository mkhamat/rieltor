import multer from "multer"
import fs from "fs"
import { Appartment } from "../models/AppartmentModel.js"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const imageUpload = multer({ storage: storage })

async function deleteImage(req, res, next) {
  try {
    if (req.params.id && req.params.image) {
      let appartment = await Appartment.findById(req.params.id)
      let index = appartment.pictures.indexOf(req.params.image)
      if (index >= 0) {
        appartment.pictures.splice(index, 1)
        await appartment.save()
        fs.unlinkSync(`./images/${req.params.image}`)
        res.status(200).json({ index: index })
      } else {
        res.status(500).json({ msg: "Error" })
      }
    }
  } catch (err) {
    next(err)
  }
}

async function uploadImage(req, res, next) {
  try {
    if (req.files) {
      res.status(200).json({ message: "uploaded" })
    } else {
      res.status(500).json({ message: "error" })
    }
  } catch (err) {
    next(err)
  }
}

export { imageUpload, uploadImage, deleteImage }
