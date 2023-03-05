const mongoose = require('mongoose');
const categorieSchema=mongoose.model('categorie',{
title:{
    type :String,
    required : true,
},

description:{
    type :String,
 
},
image:{
    type :String,
    required : true,
}



})
module.exports=categorieSchema;