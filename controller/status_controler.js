const {app}= require('./../server/server');
const {Status}= require('./../models/Status');
const {Order}=require('./../models/Order');
const{mongoose}=require('./../db/mongoose');
const ObjectId= mongoose.Types.ObjectId;

app.post('/status',async(req,res)=>{
    try{
        var body= req.body
        var status = new Status(body)
        await status.save();
        res.status(200).send(status);
    }
    catch(error){
        res.status(400).send(error);
    }
})

app.patch('/status/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        if(!ObjectId.isValid(id)){
            return res.status(400).send("id is not valid");
        }
       if ((req.userRole=="system manager") || (req.userRole =="foreman")){
          const order= await Order.findOneAndUpdate({_id:id},{$set:req.body},{new:true});
        if(!order){
            return res.status(400).send("this order is not exist");  
        }
        res.status(200).send(order);

       } else if ((req.userRole=="clerk")){
            const order= await Order.findById(id).populate('windows kitchens showers stairs')
            if(!order){
            return res.status(400).send("this order is not exist")
            }
            
            if(order.paid==false){
                return res.status(400).send("this order is not ready for status changed")        
            }
            for(var i=0; i<order.showers.length; i++){
                    if(order.showers[i].has_sizes==false){
                    return res.status(400).send("this order contain shower that its sizes not taken yet")   
                }
            }
            for(var i=0; i<order.kitchens.length; i++){
                    if(order.kitchens[i].has_sizes==false){  
                    return res.status(400).send("this order contain shower that its sizes not taken yet")   
                }
            }
            order.status_id=req.body.status_id
            await order.save(req.user)
            res.status(200).send(order)
        }
        else{
            return res.status(400).send("this user is not autherized for this action");
        }
        
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
})


  