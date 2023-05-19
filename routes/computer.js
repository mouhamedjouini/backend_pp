const express = require('express');


const router = express.Router();

  const {create,getall,getbyid,del,update, getbyidAnnonceur,getbyidcategorie,findByTitle} =require('../controller/computer');


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


);
router.get('/getall',getall);
router.get('/getbyid/:id',getbyid);

router.get('/findByTitle/:title', findByTitle)

router.get('/getbyidAnnonceur/:id_Annonceur', getbyidAnnonceur)
router.get('/getbyidcategorie/:id_categorie', getbyidcategorie)
router.delete('/del/:id',del);
router.put('/update/:id',upload.any('image'),(req,res)=>{

  update(req,res,filename);

  filename='';
});






module.exports=router;