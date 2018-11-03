const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// pw encrpt on save hook
userSchema.pre("save", function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// add method to model for comparing pw
// not used with graphQL resolvers
// using bcrypt.compare inside reolvers
// bcrypt, not bcrypt-js

// ! had to remove bcrypt, had issues installing due to lib error
// ! now using bcryptjs but will use compare in resolver

//! therefore, won't need these methods for graphQL

// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };

// userSchema.methods.authenticatePassword = function(candidatePassword) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) {
//       return false;
//     }

//     return true;
//   });
// };

const Model = mongoose.model("user", userSchema);

module.exports = Model;
