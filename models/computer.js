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
categorie:{
    type :String,
    required : true,
},
date_ajout:{
    type :String,
    required : true,
},
image:{
    type :String,
    required : true,
},
prix:{
    type :String,
    required : true,
}



})
module.exports=computerSchema;