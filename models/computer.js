const mongoose = require('mongoose');
const computerSchema=mongoose.model('Computer',{
title:{
    type :String,
},

description:{
    type :String,
},
date_ajout:{
    type :String,
},
image:{
    type :String,
}



})
module.exports=computerSchema;