import http from "http"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"

import appartmentRoutes from "./routes/appartmentRoutes.js"
import uploadRoutes from "./routes/imageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import { fileURLToPath } from "url"
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const privateKey = fs.readFileSync(process.env.PRIVATE_PATH)
const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH)

const db = mongoose.connection
db.once("open", () => {
  console.log("MongoDB connected!")
})

const app = express()
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use(express.json())
app.use("/static", express.static(path.join(__dirname, "./images")))
app.use(express.static(path.join(__dirname, "../client/build")))

app.use("/api/appartments", appartmentRoutes)
app.use("/api/users", userRoutes)
app.use("/api/images", uploadRoutes)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

http
  .createServer({ key: privateKey, cert: certificate }, app)
  .listen(process.env.PORT)
