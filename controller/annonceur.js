const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Annonceur = require('../models/annonceur')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { lastname, firstname,image, email, password } = req.body

  if (!lastname ||!firstname || !image ||!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await Annonceur.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const annonceur = await Annonceur.create({
    lastname,
    firstname,
    image,
    email,
    password: hashedPassword,
  })

  if (annonceur) {
    res.status(201).json({
      _id: annonceur.id,
      lastname: annonceur.lastname,
      firstname: annonceur.firstname,
      email: annonceur.email,
      token: generateToken(annonceur._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const annonceur = await Annonceur.findOne({ email })

  if (annonceur && (await bcrypt.compare(password, annonceur.password))) {
    res.json({
      _id: annonceur.id,
      name: annonceur.name,
      email: annonceur.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
