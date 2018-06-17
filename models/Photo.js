// Basic photo schema for managing logins
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const photoSchema = new Schema({
  category: [{
    type: String,
    enum: ['People', 'Landscape', 'Street', 'Studio', 'Animals', 'B&W']
  }],
  meta: {
    description: {
      type: String,
      trim: true
    },
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
});

photoSchema.statics.getPhotos = function ({
  limit = 0,
  skip = 0,
  filter = {},
  sort = { _createdAt: -1 }
} = {}) {
  return this
    .find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip)
};

module.exports = mongoose.model("Photo", photoSchema);
