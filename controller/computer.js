const Computer = require('../models/computer');
const create = async (req, res, filename) => {
  try {
    let data = req.body;
    let computer = new Computer(data);
    computer.image = filename;
    let result = await computer.save(); // <-- appel de la méthode save() sur l'instance créée
    res.send(result);
  } catch (err) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred .',
    });
  }
}
const getall =async (req,res)=>{
try{
let result=await Computer.find();
res.send(result);
}
catch(err){
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An error occurred .',
  });
}



}

  const getbyidAnnonceur =async (req,res)=>{
  let id_Annonceur = req.params.id_Annonceur;
  Computer.find({ id_Annonceur: id_Annonceur }).then(
      (data) => {
          res.send(data);
      },
      (error) => {
          console.log(error)
          res.status(500).json({
            error: 'Internal Server Error',
            message: 'An error occurred .',
          });
      }
  );

};


const getbyid =async (req,res)=>{
try{
let id=req.params.id;
let result=await Computer.findById({_id:id});
res.send(result);

}
catch(err){
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An error occurred .',
  });
}




}

const del=async (req,res)=>{
try{
let id=req.params.id;
let result=await Computer.findByIdAndDelete({_id:id})
res.send(result);


}


    catch(err){
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred .',
      });
    }
    
}

const update = async (req, res,filename) => {
  try {
    let id = req.params.id;
    let data = req.body;

if(filename.length>0){
data.image=filename;
}

    let result = await Computer.findByIdAndUpdate({_id:id}, data); // <-- passer les arguments séparément
  
    res.status(200).send(result);
  }  catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred .',
    });
}
module.exports={
create,
getall,
getbyid,
getbyidAnnonceur,
del,
update,

}
}