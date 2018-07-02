const mongoose = require("mongoose")
const Photo = mongoose.model("Photo")
const Order = mongoose.model("Order")

exports.generateOrder = async (replace = false) => {
  const photos = await Photo.getPhotos()
  const order = await Order.findOne()

  if (order && !replace)
    return

  let gallery = []
  photos.forEach(photo => {
    gallery.push(photo._id)
  })
  const newOrder = await Order.findOneAndUpdate(
    {},
    { gallery },
    {
      upsert: true
    }, () => {
      console.log("Generated new gallery order")
    })
}