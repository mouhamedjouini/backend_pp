const mongoose = require('mongoose');
const computerSchema=mongoose.model('Computer',{
title:{
    type :String,
    required : true,
},

description:{
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