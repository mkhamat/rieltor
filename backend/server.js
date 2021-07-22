import express from "express"
import mongoose from "mongoose"
import appartmentRoutes from "./routes/appartmentRoutes.js"
import uploadRoutes from "./routes/imageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"
dotenv.config()

const db = mongoose.connection
db.once("open", () => {
  console.log("mongo connected")
})

const app = express()
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use(express.json())
app.use("/static", express.static("images"))
app.use(express.static("../client/build"))

app.use("/appartments", appartmentRoutes)
app.use("/users", userRoutes)
app.use("/images", uploadRoutes)

app.get("*", (req, res) => {
  res.sendFile("../client/build/index.html")
})
app.listen(3001)
