const express = require("express")
const routes = require("./routes/routes")
const app = express()
const fs = require("fs")
const cors = require("cors")
const path = require("path")
const { promisify } = require("es6-promisify")
const compression = require("compression")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const passport = require("passport")
require("./helpers/passport")
const bodyParser = require("body-parser")
const { logging } = require("./helpers/logging")
const errorHandlers = require("./helpers/errorHandlers")
const cookieParser = require('cookie-parser')

// Enable gzip
app.use(compression())

// Enable CORS for development
if (process.env.DEVELOPMENT) {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
  }))
}

// Set cache headers for static content to 1 year
// Static content should be served by an Nginx proxy in production
const maxAge = process.env.NODE_ENV === "production" ? 31536000 : 1
// Try to serve static files from /build first
app.use(express.static(path.join(__dirname, "build"), { maxAge }))
// Gallery images are in /public
app.use(express.static(path.join(__dirname, "public"), { maxAge }))

// Parses POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

// Set cookies for tracking sessions
app.use(
  session({
    secure: true,
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// PassportJS handles user logins
app.use(passport.initialize())
app.use(passport.session())

// Promisify the login API
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

// Log non-static requests with a timestamp, HTTP method, path and IP address
app.use(logging)

// Load the routes
app.use("/", routes)

module.exports = app 