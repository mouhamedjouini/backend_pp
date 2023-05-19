const mongoose = require('mongoose');
const categorieSchema=mongoose.model('categorie',{
name:{
    type :String,
    required : true,
},

description:{
    type :String,
},
image:{
    type :String,
}
})
module.exports=categorieSchema;