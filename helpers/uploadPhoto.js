const fs = require("fs")
const sharp = require("sharp")
const mkdirp = require("mkdirp")
const rmdir = require("rmdir")

exports.deletePhoto = (id) => {
  return new Promise((resolve, reject) => {
    const photoFolder = `${process.env.ROOT}/public/images/gallery/${id}`
    if (fs.existsSync(photoFolder))
      rmdir(photoFolder)
    resolve()
  })
}

exports.uploadPhoto = (photo, id) => {
  return new Promise((resolve, reject) => {
    const photoFolder = `${process.env.ROOT}/public/images/gallery/${id}`
    if (!fs.existsSync(photoFolder))
      mkdirp.sync(photoFolder)
    resolve()
    sharp(photo)
      .rotate()
      .resize(2000, 2000)
      .max()
      .toFormat("jpg")
      .toFile(`${photoFolder}/large.jpg`)
      .then(() => {
        sharp(photo)
          .rotate()
          // Resize to 400px on longest side
          .resize(400, 400)
          .max()
          .toFormat("jpg")
          .toFile(
            `${photoFolder}/thumbnail.jpg`
          )
          .then(() => {
            resolve()
          });
      })
      .catch(err => {
        console.error(err);
        reject();
      });
  })
}
