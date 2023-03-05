const express = require('express');



const router = express.Router();

  const {create,getall,del,update,getbyid} =require('../controller/categorie');


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
router.get('/getbyid/:id',getbyid);
router.get('/getall',getall);
router.delete('/del/:id',del);
router.put('/update/:id',upload.any('image'),(req,res)=>{

    update(req,res,filename);
  
    filename='';
  });




module.exports=router;