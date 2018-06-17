const mongoose = require("mongoose")
const User = mongoose.model("User")
const passport = require('passport')
const { promisify } = require('es6-promisify')

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    req.status(401)
    res.redirect("/")
  }
}

exports.checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ name: req.user.name })
  } else {
    res.status(401)
    res.json({ error: "401 Not Authenticated" })
  }
}

exports.createUser = (email, password) => {
  const user = new User({ email })
  const register = User.register(user, password, err => {
    if (err) {
      console.log(err.message)
    } else {
      console.log("Successfully created user " + email)
    }
  })
}