const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  avatar: {
    type: String,
  }
});

userSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
