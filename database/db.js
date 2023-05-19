const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khalilbarhoumi:hublocation123@hublocation.gk4icuu.mongodb.net/computer')
.then(

()=>{
    console.log('connect');
}


)
.catch(
(err)=>{
console.log(err);

}

)