const express = require('express');



const router = express.Router();

  const {create,del,getbyidAnnonce} =require('../controller/comments');





router.post('/create',create);
router.get('/getbyidAnnonce/:id_annonce',getbyidAnnonce);
router.delete('/del/:id',del);
module.exports=router;