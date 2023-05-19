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
};


const getbyidAnnonceur = async (req, res) =>
{
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
module.exports = {
  create,
  getall,
  getbyid,
  getbyidAnnonceur,
  getbyidcategorie,
  del,
  update

}