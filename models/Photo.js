const mongoose = require("mongoose")
const Order = mongoose.model("Order")
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const photoSchema = new Schema({
  meta: {
    description: {
      type: String,
      trim: true
    },
    category: [String],
    camera: {
      type: String,
      trim: true
    },
    lens: {
      type: String,
      trim: true
    },
    iso: {
      type: String,
      trim: true
    },
    aperture: {
      type: String,
      trim: true
    },
    shutterSpeed: {
      type: String,
      trim: true
    },
    focalLength: {
      type: String,
      trim: true
    }
  }
}, {
    timestamps: true
  })

photoSchema.statics.getPhotos = function ({
  limit = 0,
  skip = 0,
  filter = {},
  sort = {
    createdAt: -1
  }
} = {}) {
  return this
    .find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip)
}

photoSchema.pre("save", async function (next) {
  await Order.newPhoto(this._id)
  next()
})

module.exports = mongoose.model("Photo", photoSchema)