const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username must be  atleast 3 characters  long"],
  },
  email: {
    unique: true,
    lowercase: true,
    required: true,
    type: String,
    trim: true,
    minlength: [12, "Email must  be atleast 12 charactes long"],
  },
  password:{
    type:String,
    trim:true,
    required:true,
    minlength:[5,"Password Must be atleast 5 digit Long"]
  }
  
})

const user = mongoose.model('user', userSchema)

module.exports = user
