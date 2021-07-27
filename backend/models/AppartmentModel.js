import mongoose from "mongoose"

const appartmentSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  price_type: {
    type: String,
  },
  price: {
    type: Number,
  },
  rooms: {
    type: Number,
  },
  floor: {
    type: Number,
  },
  floors: {
    type: Number,
  },
  m2: {
    type: Number,
  },
  description: {
    type: String,
  },
  phone: {
    type: Number,
  },
  pictures: [],
})

appartmentSchema.index({ address: "text", description: "text" })
const Appartment = mongoose.model("Appartment", appartmentSchema)
export { Appartment }
