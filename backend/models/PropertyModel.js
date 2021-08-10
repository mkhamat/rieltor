import mongoose from "mongoose"

const propertySchema = new mongoose.Schema({
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
    property_type: 'flat' | 'house' | 'land',
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

propertySchema.index({address: "text", description: "text"})
const Property = mongoose.model("Appartment", propertySchema)
export {Property}
