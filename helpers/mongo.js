require("dotenv").config({ path: "variables.env" })
const mongoBackup = require("mongodb-backup")
const mongoRestore = require("mongodb-restore")
const copydir = require('copy-dir')
const tar = require("tar")
const fs = require("fs")
const path = require("path")
const rmdir = require("rmdir")
const S3 = require("./S3")

// Restore database from S3, giving user a choice of most recent backups
exports.restore = async () => {
  console.log("Restoring files")
  // Create backup folder if it doesn't already exist
  if (!fs.existsSync("mongodb"))
    fs.mkdirSync("mongodb")

  if (!fs.existsSync("mongodb/temp"))
    fs.mkdirSync("mongodb/temp")

  // Downloads most recent S3 backup
  const downloadFile = await S3.downloadIndex(
    process.env.S3_BACKUP_BUCKET_NAME,
    'mongodb/temp'
  )
  if (downloadFile === false)
    process.exit()
  // Extract the tarball into a temp folder
  tar.x({
    file: path.join(__dirname, "..", downloadFile),
    cwd: path.join(__dirname, "../mongodb/temp")
  }).then(err => {
    if (err) return console.log("Error extracting tarball \n" + err)
    // Restore /public folder
    rmdir(path.join(__dirname, '../public'), () => {
      fs.renameSync(
        path.join(__dirname, '../mongodb/temp/public'),
        path.join(__dirname, '../public'))
    })
    // Restore the database
    mongoRestore({
      drop: true,
      uri: process.env.DATABASE,
      root: "mongodb/temp/mongodb/backup/james-booth-photography",
      callback: err => {
        if (err)
          return console.log("Error restoring database \n" + err)
        // Remove temp folder
        rmdir('mongodb/temp', err => {
          if (err) {
            console.log("Error deleting temp folder")
            console.log(err)
          } else {
            console.log("Cleaned up temp folder")
          }
        })
        console.log("Successfully restored database")
      }
    })
  }).catch(err => {
    console.log(err)
  })

}

exports.backup = () => {
  console.log("Backing up files")

  // Create backup folder if it doesn't already exist
  if (!fs.existsSync("mongodb"))
    fs.mkdirSync("mongodb")

  // Format timestamp to weekday-month-date-year-hour-min-sec
  // E.g thu-feb-15-2018-10-11-01 
  const timestamp = new Date()
    .toString()
    .toLowerCase()
    .split(" ")
    .splice(0, 5)
    .join("-")
    .split(":")
    .join("-")

  // Dump database into local backup folder
  mongoBackup({
    uri: process.env.DATABASE,
    root: "mongodb/backup",
    callback: err => {
      if (err)
        return console.log(err)
      else {
        console.log("Successfully backed up database to mongodb/backup")
        // Tarball the database dump
        tar.c({ file: `mongodb/${timestamp}.tgz` },
          ["./mongodb/backup", "./public"]
        ).then(_ => {
          // Upload the tarball to S3
          S3.upload(
            process.env.S3_BACKUP_BUCKET_NAME,
            `mongodb/${timestamp}.tgz`
          )
          // Restrict S3 bucket to 30 entries
          S3.cleanBucket(process.env.S3_BACKUP_BUCKET_NAME, 30)
          // Clean up temp folder
          rmdir('mongodb/backup', err => {
            if (err) {
              console.log("Error deleting temp folder")
              console.log(err)
            }
          })
        })
      }
    }
  })
}