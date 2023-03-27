const mongoose = require('mongoose')

const AnnonceurSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a fname'],
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

module.exports = mongoose.model('Annonceur', AnnonceurSchema)