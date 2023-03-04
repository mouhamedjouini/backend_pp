const mongoose = require('mongoose');
const categorieSchema=mongoose.model('categorie',{
title:{
    type :String,
},

description:{
    type :String,
},
image:{
    type :String,
}



})
module.exports=categorieSchema;