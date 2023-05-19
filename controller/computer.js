const Computer = require('../models/computer');
const mongoose = require('mongoose');

const currentDate = new Date();

const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();

const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
console.log(formattedDateTime);

const create = async (req, res, filename) =>
{
  try
  {
    let data = req.body;
    data.date_ajout = formattedDateTime; // set the formatted date and time
    let computer = new Computer(data);
    computer.image = filename;
    let result = await computer.save(); // <-- appel de la méthode save() sur l'instance créée
    // res.send(result);
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (err)
  {
    res.status(400).json({
      status: 'failure',
      message: err,
    });
    console.log(res);
    console.log(err);
  }
};


const getall = async (req, res) =>
{
  try
  {
    let result = await Computer.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'id_categorie',
          foreignField: '_id',
          as: 'categorie'
        }
      },
      {
        $lookup: {
          from: 'annonceurs',
          localField: 'id_Annonceur',
          foreignField: '_id',
          as: 'annonceur'
        }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (err)
  {
    res.status(!200).json({
      status: 'failure',
      message: err
    });
  }
<<<<<<< HEAD
};


const getbyidAnnonceur = async (req, res) =>
{
=======
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
>>>>>>> d26de5a3d47ad06adae211ba7b0693b2c5393be6
  let id_Annonceur = req.params.id_Annonceur;
  Computer.find({ id_Annonceur: id_Annonceur }).then(
    (data) =>
    {
      res.send(data);
    },
    (err) =>
    {
      console.log(error)
      res.status(!200).json({
        status: 'failure',
        message: err,
      });
    }
  );

};
const getbyidcategorie = async (req, res) =>
{
  let id_categorie = req.params.id_categorie;
  Computer.find({ id_categorie: id_categorie }).then(
    (data) =>
    {
      // res.send(data);
      res.status(200).json({
        status: 'success',
        data: data
      });
    },
    (err) =>
    {
      console.log(error)
      res.status(500).json({
        status: 'failure',
        message: err,
      });
    }
  );

};

const getbyid = async (req, res) =>
{
  try
  {
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
  } catch (err)
  {
    console.error(err); // log the error to the console
    res.status(500).json({
      status: 'failure',
      message: err,
    });
  }
};




const del = async (req, res) =>
{
  try
  {
    let id = req.params.id;
    let result = await Computer.findByIdAndDelete({ _id: id })
    res.send(result);


  }


  catch (err)
  {
    res.status(500).json({
      error: 'Internal Server Error',
      message: err,
    });
  }

}

const update = async (req, res, filename) =>
{
  try
  {
    let id = req.params.id;
    let data = req.body;

    if (filename.length > 0)
    {
      data.image = filename;
    }

    let result = await Computer.findByIdAndUpdate({ _id: id }, data); // <-- passer les arguments séparément

    res.status(200).send(result);
  } catch (err)
  {
    res.status(500).send(err);
  }
}
<<<<<<< HEAD
module.exports = {
  create,
  getall,
  getbyid,
  getbyidAnnonceur,
  getbyidcategorie,
  del,
  update
=======
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
>>>>>>> d26de5a3d47ad06adae211ba7b0693b2c5393be6

}