// Basic user schema for managing logins
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'name' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
