const {app}= require('./../server/server');
const{mongoose}=require('./../db/mongoose');
const {Shower}=require('./../models/Shower.js');
const {Order}= require('./../models/Order.js');
const {Kitchen}= require('./../models/Kitchen');
const {Stairs}= require('./../models/Stairs');
const {Window}= require('./../models/Window');
const {Repair}= require('./../models/Repair')
const ObjectId= mongoose.Types.ObjectId;



app.post('/repair',async(req,res)=>{
    try{
        const products = req.body.products;
        var i;
        for( i=0 ; i<products.length ; i++) {
            switch(products[i].type){
                case 'kitchen':
                    if(!ObjectId.isValid(products[i]._id)){
                        return res.status(400).send("id is not valid");
                    }
                    var kitchen = await Kitchen.findById(products[i]._id)
                    if(!kitchen){
                      return res.status(400).send("this product is not exist")
                    }
                    if(kitchen.deleted==true){
                        res.status(400).send("this product is not exist")
                    }
                    var repair= new Repair(products[i])
                    repair.order_id =kitchen.order_id
                    repair.kitchen=req.body._id
                    await repair.save();
                    break;
                case 'shower':
                    if(!ObjectId.isValid(products[i]._id)){
                        return res.status(400).send("id is not valid");
                    }
                     var shower = await Shower.findById(products[i]._id)
                     console.log("111",shower)
                    if(!shower){
                        res.status(400).send("this product is not exist")
                    }
                    if(shower.deleted==true){
                        res.status(400).send("this product is not exist")
                    }
                    var repair= new Repair(products[i])
                    console.log(repair)
                    repair.order_id =kitchen.order_id
                    repair.kitchen=req.body._id
                    await repair.save();
                    break;
                 case 'stairs':
                    if(!ObjectId.isValid(products[i]._id)){
                        return res.status(400).send("id is not valid");
                    }
                    var stair = await Stairs.findById(products[i]._id)
                    if(!stair){
                     return res.status(400).send("this product is not exist")
                    }
                    if(stair.deleted==true){
                      return res.status(400).send("this product is not exist")
                    }
                    var repair= new Repair(products[i])
                    repair.order_id =kitchen.order_id
                    repair.kitchen=req.body._id
                    await repair.save();
                    break;
                case 'window':
                    if(!ObjectId.isValid(products[i]._id)){
                        return res.status(400).send("id is not valid");
                    }
                    var window = await Window.findById(products[i]._id)
                    if(!window){
                       return res.status(400).send("this product is not exist")
                    }
                    if(window.deleted==true){
                      return res.status(400).send("this product is not exist")
                    }
                    var repair= new Repair(products[i])
                    repair.order_id =kitchen.order_id
                    repair.kitchen=req.body._id
                    await repair.save();
                    break;                        
             }
            


            
        }
        
       return res.status(200).send("new repair created");
    }
    catch(error){
      return res.status(400).send(error);
    }
})