const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/annonceur')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({
      status:false , message:'Please add all fields'
    });
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({
      status:false , message:'User already exists'
    });
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({
      status:false , message:'Invalid user data'
    });

    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({
      status:false , message:'Invalid credentials'
    });
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})
const update = async (req, res,filename) => {
  try {
    let id = req.params.id;
    let data = req.body;

if(filename.length>0){
data.image=filename;
}

    let result = await User.findByIdAndUpdate({_id:id}, data); // <-- passer les arguments séparément
    res.status(200).json({
       message:'result'
       
    });;
  }  catch (error) {
      res.status(500).send(error).json({
        status:false,
        message:'Updated failed'
     });;;
   }
}
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
const getall =async (req,res)=>{
    try{
    let result=await User.find();
    res.send(result).json({
   
      message:'Success'
   });;
    }
    catch(err){
      console.log(err);
    }
}
    
    const del=async (req,res)=>{
      console.log("gg");
        try{
        let id=req.params.id;
        let result=await User.findByIdAndDelete({_id:id})
        res.send(result);
        
        
        }
        
        
            catch(err){
                console.log(err);
            }
            
        };
    
    
    
module.exports = {
  registerUser,
  loginUser,
  getMe,
  update,
  getall,
  del,
}
