const Categorie = require('../models/categorie');
const create = async (req, res, filename) => {
    try {
      let data = req.body;
      let categorie = new Categorie(data);
      categorie.image = filename;
      let result = await categorie.save(); // <-- appel de la méthode save() sur l'instance créée
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

const getall =async (req,res)=>{
try{
let result=await Categorie.find();
res.send(result);
}
catch(err){
    console.log(err);
}



}


const del=async (req,res)=>{
try{
let id=req.params.id;
let result=await Categorie.findByIdAndDelete({_id:id})
res.send(result);


}


    catch(err){
        console.log(err);
    }
    
};

const update =async(req,res)=>{
    const categorie = await Categorie.findById(req.params.id) 
    if (!categorie) {
        res.status(400)
        throw new Error('book not found')
      }
    

      
      const updateC = await Categorie.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
      
        res.status(200).json(updateC)
  

};
module.exports={
create,
getall,
del,
update

}