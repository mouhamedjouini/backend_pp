const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const CommentSchema=mongoose.model('Comments',{
id_Annonceur:{
    type:objectId
       
},
commentaire:{
    type :String,
    required : true,
},
id_annonce:{
    type :objectId,
    required : true,
},
date_ajout:{
    type :String,
    required : true,
},



})
module.exports=CommentSchema;