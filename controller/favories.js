const Favories = require('../models/favories');
const mongoose = require('mongoose');
const add = async (req, res) => {
    try {
      let data = req.body;
      let favories = new Favories(data);

      let result = await favories.save(); // <-- appel de la méthode save() sur l'instance créée
      res.send(result);
    } catch (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred .',
      });
    }
  }
  const getbyidAnnonceur = async (req, res) => {
    let id_Annonceur = req.params.id_Annonceur;
    console.log(id_Annonceur);
  
    try {
      let data = await Favories.aggregate([
  
        { $match: { id_Annonceur:  mongoose.Types.ObjectId(id_Annonceur) } },
  
    
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
  const remove=async (req,res)=>{
    try{
    let id=req.params.id;
    let result=await Favories.findByIdAndDelete({_id:id})
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
    add,
    getbyidAnnonceur,
    remove
   

    
    }