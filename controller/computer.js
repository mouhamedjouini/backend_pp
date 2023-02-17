const Computer = require('../models/computer');
const create = async (req, res, filename) => {
    try {
      let data = req.body;
      let computer = new Computer(data);
      computer.image = filename;
      let result = await computer.save(); // <-- appel de la méthode save() sur l'instance créée
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

const getall =async (req,res)=>{
try{
let result=await Computer.find();
res.send(result);
}
catch(err){
    console.log(err);
}



}

const getbyid =async (req,res)=>{
try{
let id=req.params.id;
let result=await Computer.findById({_id:id});
res.send(result);

}
catch(err){
    console.log(err);
}




}

const del=async (req,res)=>{
try{
let id=req.params.id;
let result=await Computer.findByIdAndDelete({_id:id})
res.send(result);


}


    catch(err){
        console.log(err);
    }
    
}

const update = async (req, res) => {
    try {
      let id = req.params.id;
      let data = req.body;
      let result = await Computer.findByIdAndUpdate(
        {_id:id},
         data,{new:true}
         ); // <-- passer les arguments séparément
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }
module.exports={
create,
getall,
getbyid,
del,
update

}