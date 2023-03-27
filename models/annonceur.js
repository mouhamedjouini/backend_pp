const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please add a fname'],
    },
    lastename: {
        type: String,
        required: [true, 'Please add a lname'],
      },
      
      image: {
        type: String,
        required: [true, 'Please add a image'],
      },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
   
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Admin', adminSchema)