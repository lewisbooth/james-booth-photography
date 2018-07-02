const mongoose = require("mongoose")
const path = require("path")
const Photo = mongoose.model("Photo")
const Order = mongoose.model("Order")

exports.homepage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"))
}

exports.getImageList = async (req, res) => {
  const gallery = await Order.getPhotos()
  res.json({ gallery })
}