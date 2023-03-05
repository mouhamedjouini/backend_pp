const express = require('express');



const router = express.Router();

  const {create,getall,getbyid,del,update} =require('../controller/computer');


// multer config

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



router.post('/create',  upload.any('image'),(req,res)=>{

    create(req,res,filename);
}

)
router.get('/getall',getall);
router.get('/getbyid/:id',getbyid);
router.delete('/del/:id',del);
router.put('/update/:id',upload.any('image'),(req,res)=>{

  update(req,res,filename);

  filename='';
});






module.exports=router;