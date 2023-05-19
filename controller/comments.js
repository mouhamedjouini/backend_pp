const Comments = require('../models/comments');
const mongoose = require('mongoose');
const create = async (req, res) => {
    try {
      let data = req.body;
      let comments = new Comments(data);

      let result = await comments.save(); // <-- appel de la méthode save() sur l'instance créée
      res.send(result);
    } catch (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred .',
      });
    }
  }
 const getbyidAnnonce = async (req, res) => {
  let id_annonce = req.params.id_annonce;
  console.log(id_annonce);

  try {
    let data = await Comments.aggregate([

      { $match: { id_annonce:  mongoose.Types.ObjectId(id_annonce) } },

  
      {
        $lookup: {
          from: 'computers',
          localField: 'id_annonce',
          foreignField: '_id',
          as: 'computer',
        },
      },

 
      {
        $lookup: {
          from: 'annonceurs',
          localField: 'id_Annonceur',
          foreignField: '_id',
          as: 'annonceur',
        },
      },

      // Sélectionnez les champs à renvoyer
   
    ]);

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred.',
    });
  }
};
  const del=async (req,res)=>{
    try{
    let id=req.params.id;
    let result=await Comments.findByIdAndDelete({_id:id})
    res.send(result);
    
    
    }
    
    
        catch(err){
            res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred .',
      });
        }
        
    }
    module.exports={
        create,
        getbyidAnnonce,
        del,

        
        }