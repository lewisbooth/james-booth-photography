const mongoose = require("mongoose")
const Photo = mongoose.model("Photo")
const Order = mongoose.model("Order")
const { uploadPhoto, deletePhoto } = require("../helpers/uploadPhoto")

exports.newPhoto = async (req, res, next) => {
  if (!req.file || !req.body || !req.body.meta) {
    res.status(400)
    return res.send()
  }
  console.log("📸  New photo from " + req.user.name)
  console.log(req.body)
  const meta = JSON.parse(req.body.meta)
  const photo = req.file.buffer
  const photoSave = await new Photo({ meta }).save(
    (err, data) => {
      if (err) {
        console.log(err)
        res.status(400)
        return res.send()
      }
      uploadPhoto(photo, data._id)
        .then(() => {
          console.log("Successfully uploaded image")
          res.status(200)
          res.send()
        }).catch(err => {
          console.log(err)
          res.status(400)
          res.send()
        })
    })
}

exports.editPhoto = async (req, res) => {
  console.log(req.body)
  if (!req.body) {
    res.status(400)
    return res.send()
  }
  const photoSave = await Photo.findOneAndUpdate({ _id: req.params.id },
    {
      $set: { meta: req.body }
    },
    { new: true },
    (err, item) => {
      item.save()
      if (err || !item) {
        res.status(400)
        return res.send()
      }
      res.status(200)
      res.send()
    })
}

exports.deletePhoto = async (req, res) => {
  const deleted = await Photo.findOneAndRemove(
    { _id: req.params.id }
  )
  deletePhoto(req.params.id)
    .then(() => {
      res.status(200)
      res.send()
    }).catch(err => {
      res.status(400)
      res.send()
    })
}

exports.swapPosition = async (req, res, next) => {
  const { start, finish } = req.params
  Order.repositionPhoto(start, finish)
    .then(gallery => {
      res.json({ gallery })
    })
    .catch(err => {
      console.log(err)
    })
}
