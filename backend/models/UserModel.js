import mongoose from "mongoose"
import bcrypt from "bcrypt"

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

const newUser = new User({
  login: process.env.LOGIN,
  password: bcrypt.hash(process.env.PASSWORD, 10),
  admin: process.env.ADMIN,
}).save()

export { User }
