const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const computerSchema=mongoose.model('Computer',{
id_Annonceur:{
    type:objectId
       
},
title:{
    type :String,
    required : true,
},


description:{
    type :String,
    required : true,
},
id_categorie:{
    type :objectId,
 
},
date_ajout:{
    type :String,
   
},
image:{
    type :String,
    //required : true,
},
prix:{
    type :String,
  
}



})
module.exports=computerSchema;