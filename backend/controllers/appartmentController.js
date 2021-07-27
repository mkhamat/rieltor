import { Appartment } from "../models/AppartmentModel.js"

async function getAppartment(req, res, next) {
  try {
    let appartment = await Appartment.findOne({ _id: req.params.id })
    res.status(200).json(appartment)
  } catch (err) {
    next(err)
  }
}

async function removeAppartment(req, res, next) {
  try {
    await Appartment.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "removed" })
  } catch (err) {
    next(err)
  }
}

async function updateAppartment(req, res, next) {
  try {
    let appartment = await Appartment.findByIdAndUpdate(req.params.id, {
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
    let appartment = await new Appartment({ ...req.body })
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
        if (key === "search") {
          filters["$text"] = { $search: filter.search }
        } else if (key === "m2") {
          filters["m2"] = { $gte: filter.m2 }
        } else if (key === "m22") {
          filters["m2"] = { $lte: filter.m22 }
        } else if (key === "priceFrom") {
          filters["price"] = { $gte: filter.priceFrom }
        } else if (key === "priceTo") {
          filters["price"] = { $lte: filter.priceTo }
        } else {
          filters[key] = filter[key]
        }
      }
    }

    let apps = await Appartment.find(filters)
      .limit(limit)
      .skip((current - 1) * limit)
    let count = await Appartment.countDocuments(filters)
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
