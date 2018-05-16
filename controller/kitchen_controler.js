const {app}= require('./../server/server');
const{mongoose}=require('./../db/mongoose');
const{Kitchen}=require('./../models/Kitchen');
const{Order}= require('./../models/Order.js');
const ObjectId= mongoose.Types.ObjectId;


// app.post('/kitchen',async(req,res)=>{
//     try{
//         const order = await Order.findById(req.body.order_id);
//         if (order){
//             var kitchen = new Kitchen(req.body);
//             await kitchen.save();
//             console.log(kitchen);
//             res.status(200).send(kitchen);
//         }  
//     }
//     catch(error){
//         res.status(400).send(error); 
//     }
// });

app.delete('/kitchen/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

        const kitchen= await Kitchen.findById(id)
        if (!kitchen){
           return res.status(400).send(error);
        }
        kitchen.deleted= true
        const order_id= kitchen.order_id;
        const order= await Order.findByIdAndUpdate({_id:order_id},{$pull:{kitchens:id}},{new:true})
        await kitchen.save();
        res.status(200).send(kitchen);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

app.get('/kitchen/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

        const kitchen= await Kitchen.findById(id);
        if (!kitchen){
           return res.status(400).send(error);
        }  
        console.log(kitchen);
        res.status(200).send(kitchen);
    }
    catch(error){
        res.status(400).send(error);
    }
});
app.get('/kitchen',async(req,res)=>{
    try{
        const kitchen= await Kitchen.find();
        console.log(kitchen);
        res.status(200).send(kitchen);
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.patch('/kitchen/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

        const kitchen= await Kitchen.findOneAndUpdate({_id:id},{$set:req.body},{new:true});
        if (!kitchen){  
           return res.status(400).send(error);
        }  
        console.log(kitchen);
        res.status(200).send(kitchen);
    }
    catch(error){
        res.status(400).send(error);
    }
});