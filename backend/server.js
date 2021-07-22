import express from "express"
import mongoose from "mongoose"
import appartmentRoutes from "./routes/appartmentRoutes.js"
import uploadRoutes from "./routes/imageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
