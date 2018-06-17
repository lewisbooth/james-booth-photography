const mongoose = require("mongoose")
const path = require("path")
const User = mongoose.model("User")
const Photo = mongoose.model("Photo")

exports.homepage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"))
}

exports.getImageList = async (req, res) => {
  const images = await Photo.getPhotos()
  res.json({ images })
}