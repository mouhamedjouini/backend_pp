const Categorie = require('../models/categorie');
const create = async (req, res, filename) => {
    try {
      let data = req.body;
      let categorie = new Categorie(data);
      categorie.image = filename;
      let result = await categorie.save(); // <-- appel de la méthode save() sur l'instance créée
      res.status(200).json({
        status: 'success',
        data: result
      });
        } catch (err) {
          res.status(!200).json({
            status: 'failure',
            message: err
          });
    }
  }

const getall =async (req,res)=>{
try{
let result=await Categorie.find();
res.status(200).json({
  status: 'success',
  data: result
});
}
catch(err){
  res.status(!200).json({
    status: 'failure',
    message: err
  });
}



}


const del=async (req,res)=>{
try{
let id=req.params.id;
let result=await Categorie.findByIdAndDelete({_id:id})
res.status(!200).json({
  status: 'failure',
  message: err
});


}


    catch(err){
      res.status(!200).json({
        status: 'failure',
        message: err
      });
    }
    
};

const update = async (req, res,filename) => {
    try {
      let id = req.params.id;
      let data = req.body;
  
  if(filename.length>0){
  data.image=filename;
  }
  
      let result = await Categorie.findByIdAndUpdate({_id:id}, data); // <-- passer les arguments séparément
      console.log(data);
      res.status(200).json({
        status: 'success',
        data: result
      });
    }  catch (error) {
      res.status(!200).json({
        status: 'failure',
        message: err
      });
     }
  };
  const getbyid =async (req,res)=>{
    try{
    let id=req.params.id;
    let result=await Categorie.findById({_id:id});
    res.status(200).json({
      status: 'success',
      data: result
    });
    
    }
    catch(err){
      res.status(!200).json({
        status: 'failure',
        message: err
      });
    }
    
    
    
  }    
 
module.exports={
create,
getall,
del,
update,
getbyid

}