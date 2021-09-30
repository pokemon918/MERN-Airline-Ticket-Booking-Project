const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  resetToken: {
    type: String,
  },
  updated: Date,
  created: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = new mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: new PasswordComplexity({
      min: 8,
      max: 26,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
