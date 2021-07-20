import express from "express"
import mongoose from "mongoose"
import appartmentRoutes from "./routes/appartmentRoutes.js"
import uploadRoutes from "./routes/imageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const db = mongoose.connection
db.once("open", () => {
  console.log("mongo connected")
})

const app = express()
mongoose.connect(
  "mongodb+srv://mkhamat:herosima@cluster0.p3b4m.mongodb.net/rieltor_upload",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
)

app.use(express.json())
app.use("/static", express.static("images"))
app.use("/appartments", appartmentRoutes)
app.use("/users", userRoutes)
app.use("/images", uploadRoutes)

app.listen(3001, () => {
  console.log("works")
})
