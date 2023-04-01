const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  update
} = require('../controller/admin')
const { protect } = require('../middleware/authmiddleware')
const multer=require('multer');

let filename='';
const mystorage=multer.diskStorage({
destination:'./uploads',
filename:(req,file,redirect)=>{

filename=Date.now()+'.'+file.mimetype.split('/')[1];
redirect(null,filename);
}

})
const upload=multer ({storage:mystorage})



router.post('/',  upload.any('image'),(req,res)=>{

    registerUser(req,res,filename);
})

router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.put('/update/:id',upload.any('image'),(req,res)=>{

  update(req,res,filename);

  filename='';
});


module.exports = router