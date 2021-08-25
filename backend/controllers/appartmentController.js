import { Property } from "../models/PropertyModel.js"

async function getAppartment(req, res, next) {
  try {
    let property = await Property.findOne({ _id: req.params.id })
    res.status(200).json(property)
  } catch (err) {
    next(err)
  }
}

async function removeAppartment(req, res, next) {
  try {
    await Property.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "removed" })
  } catch (err) {
    next(err)
  }
}

async function updateAppartment(req, res, next) {
  try {
    let appartment = await Property.findByIdAndUpdate(req.params.id, {
      ...req.body,
    })
    await appartment.save()
    res.status(200).json({ message: "updated" })
  } catch (err) {
    next(err)
  }
}

async function addAppartment(req, res, next) {
  try {
    console.log(req.body)
    let appartment = await new Property({ ...req.body })
    await appartment.save()
    res.status(200).json({ message: "added" })
  } catch (err) {
    next(err)
  }
}

async function getAppartments(req, res, next) {
  try {
    let { current = 1, limit = 10 } = req.body.pageState

    let filter = req.body.filter
    let filters = {}

    for (let key in filter) {
      if (filter[key] !== null && filter[key] !== "") {
        if (key === "m2") {
          filters["m2"] = { $gte: filter.m2 }
        } else if (key === "m22") {
          filters["m2"] = { $lte: filter.m22 }
        } else if (key === "priceFrom") {
          filters["price"] = { $gte: filter.priceFrom }
        } else if (key === "priceTo") {
          filters["price"] = { $lte: filter.priceTo }
        } else if (key === "roomsFrom") {
          filters["rooms"] = { $gte: filter.roomsFrom }
        } else if (key === "roomsTo") {
          filters["rooms"] = { $lte: filter.roomsTo }
        } else if (key === "floorFrom") {
          filters["floor"] = { $gte: filter.floorFrom }
        } else if (key === "floorTo") {
          filters["floor"] = { $lte: filter.floorTo }
        } else if (key === "property_object") {
          filters["property_object"] = { $in: filter.property_object }
        } else if (key === "phone") {
          filters['$or'] = [{ "phone": { $regex: new RegExp(`${filter[key]}`, 'i') } }, { "numbers.number": { $regex: new RegExp(`${filter[key]}`, 'i') } }]
        } else {
          filters[key] = { $regex: new RegExp(`${filter[key]}`, 'i') }
        }
      }
    }

    let apps = await Property.find(filters)
      .limit(limit)
      .skip((current - 1) * limit)
    console.log(filters);
    let count = await Property.countDocuments(filters)
    res.status(200).json({
      pageState: {
        count: count,
        current: current,
        limit: limit,
      },
      apps: apps,
    })
  } catch (err) {
    next(err)
  }
}

export {
  getAppartments,
  addAppartment,
  removeAppartment,
  getAppartment,
  updateAppartment,
}
