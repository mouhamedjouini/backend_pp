const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectID;
const FavorisSchema=mongoose.model('Favories',{

id_annonce:{
    type :objectId,
    required : true,
},
id_Annonceur:{
    type: objectId,
    required: true
}



})
module.exports=FavorisSchema;