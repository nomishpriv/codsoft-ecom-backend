const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your Email address is required"],
    unique: true,
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   "Please enter a valid email",
    // ],
  },
  username: {
    type: String,
    required: [true, "Your Username is required"],
    min: [4, 'username will be larger than 4']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('users', userSchema)