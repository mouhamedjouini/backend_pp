const Computer = require('../models/computer');

const mongoose = require('mongoose');
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
const createbase64 = async (req, res, filename) => {
  try {
    let data = req.body;
    let computer = new Computer(data);
    computer.image = req.body.image; // A
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
let result=await Computer.aggregate(
  [
    {
        $lookup:{
            from:'categories',
            localField: 'id_categorie',
            foreignField: '_id',
            as : 'categorie'

        }
      },
      {
        $lookup:{
          from:'annonceurs',
          localField: 'id_Annonceur',
          foreignField: '_id',
          as : 'annonceur'

      }

    },]);
res.send(result);
}
catch(err){
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An error occurred .',
  });
}
}

const findByTitle = async (req, res) => {
  try {
    const title = req.params.title; // Assuming the title is part of the URL path parameter
    const result = await Computer.find({ title: { $regex: title, $options: 'i' } });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred.',
    });
  }
};

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
const getbyidcategorie =async (req,res)=>{
  let id_categorie = req.params.id_categorie;
  Computer.find({ id_categorie: id_categorie }).then(
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

const getbyid = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Computer.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'id_categorie',
          foreignField: '_id',
          as: 'categorie',
        },
      },
      {
        $lookup:{
          from:'annonceurs',
          localField: 'id_Annonceur',
          foreignField: '_id',
          as : 'annonceur'

      }

    }
    ]);
    res.send(result[0]);
  } catch (err) {
    console.error(err); // log the error to the console
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred.',
    });
  }
};




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
      res.status(500).send(error);
   }
}
module.exports={
create,
getall,
getbyid,
getbyidAnnonceur,
findByTitle,
getbyidcategorie,
del,
update,
createbase64

}