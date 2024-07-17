const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide a email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    validate: {
      // only works on SAVE !!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
