import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: Boolean,
})

const User = mongoose.model("User", userSchema)

export { User }
