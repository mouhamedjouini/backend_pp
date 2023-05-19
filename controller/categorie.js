const Categorie = require('../models/categorie');
const create = async (req, res, filename) =>
{
  try
  {
    const { name, description } = req.body;

    // Check if the required fields are present
    if (!name || !description)
    {
      return res.status(403).json({
        error: 'Bad Request',
        message: 'Please provide name, description and image for the category'
      });
    }
    // Check if a category with the same name already exists
    // const existingCategory = await Categorie.findOne({ name });
    const existingCategory = await Categorie.findOne({ name: { $regex: new RegExp(name, "i") } });
    if (existingCategory)
    {
      return res.status(409).json({
        error: 'Conflict',
        message: 'A category with this name already exists'
      });
    }

    // Create the category
    const category = new Categorie({ ...req.body, image: filename });
    const result = await category.save();

    res.send(result);
  } catch (err)
  {
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
};


const getall = async (req, res) =>
{
  try
  {
    let result = await Categorie.find();
    res.status(200).json({
      status: 'success',
      data: result
    });
    // res.send(result);
  }
  catch (err)
  {
    res.status(500).json({
      status: 'failure',
      message: err,
    });
  }
}

const del = async (req, res) =>
{
  try
  {
    let id = req.params.id;
    let result = await Categorie.findByIdAndDelete({ _id: id })
    res.send(result);
  }


  catch (err)
  {
    res.status(500).json({
      status: 'failure',
      message: err,
    });
  }
};

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

    let result = await Categorie.findByIdAndUpdate({ _id: id }, data); // <-- passer les arguments séparément
    console.log(data);
    res.status(200).send(result);
  } catch (error)
  {
    res.status(500).json({
      status: 'failure',
      message: err,
    });
  }
};
const getbyid = async (req, res) =>
{
  try
  {
    let id = req.params.id;

    let result = await Categorie.findById({ _id: id });
    // res.send(result);
    res.status(200).json({
      status: 'success',
      data: result
    });

  }
  catch (err)
  {
    res.status(500).json({
      status: 'failure',
      message: err,
    });
  }

}

module.exports = {
  create,
  getall,
  del,
  update,
  getbyid

}