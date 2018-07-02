const mongoose = require("mongoose")
const move = require("array-move")
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const orderSchema = new Schema({
  gallery: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
});

orderSchema.statics.getPhotos = async function () {
  const order = await this
    .findOne()
    .populate("gallery")
  return order.gallery
}

orderSchema.statics.newPhoto = async function (id) {
  const order = await this
    .findOne()
  if (order.gallery.indexOf(id) > -1)
    return
  order.gallery.unshift(id)
  const save = await this
    .findOneAndUpdate({}, { gallery: order.gallery })
}

orderSchema.statics.deletePhoto = async function (id) {
  const order = await this
    .findOne()
  const index = order.gallery.indexOf(id)
  const removed = order.gallery.splice(index, 1)
  await this.findOneAndUpdate({}, { gallery: order.gallery })
}

orderSchema.statics.repositionPhoto = function (start, finish) {
  const schema = this
  return new Promise(async (resolve, reject) => {
    if (!start || !finish)
      return reject("Please supply a start and finish position")
    const order = await schema.findOne()
    if (!order)
      return reject("No order found")
    move.mut(order.gallery, start, finish)
    order.save()
    console.log("Swapped photo " + start + " with " + finish)
    setTimeout(async () => {
      const newOrder = await schema.findOne().populate("gallery")
      resolve(newOrder.gallery)
    }, 100)
  })
}

module.exports = mongoose.model("Order", orderSchema);