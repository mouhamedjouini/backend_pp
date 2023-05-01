const express = require('express');



const router = express.Router();

  const {add,getbyidAnnonceur,remove} =require('../controller/favories');





router.post('/add',add);
router.delete('/remove/:id',remove);
router.get('/getbyidAnnonceur/:id_Annonceur',getbyidAnnonceur);
module.exports=router;