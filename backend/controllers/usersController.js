import { User } from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

async function userAuth(req, res, next) {
  try {
    let token = await jwt.verify(req.body.token, "vopros07")
    let user = await User.findOne({ _id: token.id })
    if (user) {
      res
        .status(200)
        .json({ login: user.login, admin: user.admin, token: req.body.token })
    } else {
      res.json({ msg: "error" })
    }
  } catch (err) {
    next(err)
  }
}

async function userLogin(req, res, next) {
  try {
    let user = await User.findOne({ login: req.body.login })
    if (user) {
      let compare = await bcrypt.compare(req.body.password, user.password)
      if (compare) {
        const token = jwt.sign({ id: user._id }, "vopros07")
        res
          .status(200)
          .json({ login: user.login, admin: user.admin, token: token })
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (err) {
    next(err)
  }
}

export { userLogin, userAuth }
