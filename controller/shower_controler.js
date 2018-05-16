const {app}= require('./../server/server');
const{mongoose}=require('./../db/mongoose');
const{Shower}=require('./../models/Shower.js');
const{Order}= require('./../models/Order.js');
const ObjectId= mongoose.Types.ObjectId;



app.delete('/shower/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

        const shower= await Shower.findByIdAndRemove(id);
        if (!shower){
           return res.status(400).send(error);
        }  
        console.log(shower);
        res.status(200).send(shower);
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get('/shower/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

        const shower= await Shower.findById(id);
        if (!shower){
           return res.status(400).send(error);
        }  
        console.log(shower);
        res.status(200).send(shower);
    }
    catch(error){
        res.status(400).send(error);
    }
});
app.get('/shower',async(req,res)=>{
    try{
        const shower= await Shower.find();
        console.log(shower);
        res.status(200).send(shower);
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.patch('/shower/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

        const shower= await Shower.findOneAndUpdate({_id:id},{$set:req.body},{new:true});
        if (!shower){  
           return res.status(400).send(error);
        }  
        console.log(shower);
        res.status(200).send(shower);
    }
    catch(error){
        res.status(400).send(error);
    }
});
