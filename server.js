const mongoose = require("mongoose")
const cron = require("node-cron")
const ip = require("ip")

// Load environment variables
require("dotenv").config({ path: "variables.env" })

process.env.DEVELOPMENT = process.env.NODE_ENV === "development"

// Expose an easy path to root directory
process.env.ROOT = __dirname

// Initiate the database connection
mongoose.connect(process.env.DATABASE, {
  autoReconnect: true,
  reconnectTries: 100,
  reconnectInterval: 5000
}, err => {
  if (err) {
    console.error("🚫 Error connecting to MongoDB")
    console.error(err.message)
  } else {
    console.log("Connected to MongoDB")
  }
})

// Use better promises for Mongo queries
mongoose.Promise = global.Promise

// Load the MongoDB models
require("./models/User")
require("./models/Photo")

// Load server scripts
const app = require("./app")
app.set("port", process.env.PORT || 1250)

// Initiate the server
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`)
  if (process.env.DEVELOPMENT)
    console.log("🐌  Development Mode 🐌 ")
  else
    console.log("⚡  Production Mode ⚡")
  console.log("Local address: " + ip.address())
})