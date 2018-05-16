const {app}= require('./../server/server');
const {mongoose}=require('./../db/mongoose');
const {Shower}=require('./../models/Shower.js');
const {Order}= require('./../models/Order.js');
const {Kitchen}= require('./../models/Kitchen');
const {Stairs}= require('./../models/Stairs');
const {Window}= require('./../models/Window');
const {Customer}= require('./../models/Customer');
const {Status}=require('./../models/Status');
const {Projects}=require('./../models/Projects');
const {set_key_value}=require('./../function/function')
const ObjectId= mongoose.Types.ObjectId;

app.post('/order',async(req,res)=>{
        try{
            const id= req.body.order_id;
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }
            const order = await Order.findById(id);
            if (!order){
                res.status(400).send(error);
            }
            
                const products = (req.body.products);
                var i;
                for( i=0 ; i<products.length ; i++) {
                    switch(products[i].type){
                        case 'kitchen':
                            var kitchen = new Kitchen(products[i]);
                            await order.kitchens.push(kitchen._id);
                            kitchen.order_id = order._id
                            await kitchen.save();
                            break;
                        case 'shower':
                            var shower = new Shower(products[i]);
                            await shower.save();
                            await order.showers.push(shower._id);
                            shower.order_id = order._id
                            break; 
                         case 'stairs':
                            var stair = new Stairs(products[i]);
                            await stair.save();
                            await order.stairs.push(stair._id);
                            stair.order_id = order._id
                            break; 
                        case 'window':
                            var window = new Window(products[i]);
                            await window.save();
                            await order.windows.push(window._id);
                            window.order_id = order._id
                            break;                        
                    }
                    


                    
                }
                //console.log(order)
                await order.save(req.user);
                const order1 = await Order.findOne({_id:id}).populate('windows kitchens showers stairs');
                res.status(200).send(order1);
            
        }
        catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });


 app.post('/order/create',async(req,res)=>{
               try{
                const customerId= req.body.customer_id;
                if(!ObjectId.isValid(customerId)){
                  return res.status(400).send(error);
                }
                    const customer  = await Customer.findById(customerId);
                    if (!customer){
                        res.status(400).send(error);
                    }   
                var order = new Order(req.body);
                order.status_id="5ae8365be528ac4180ecbcbf";
                    const products = (req.body.products);
                    var i;
                    for( i=0 ; i<products.length ; i++) {
                        switch(products[i].type){
                            case 'kitchen':
                                var kitchen = new Kitchen(products[i]);
                                await order.kitchens.push(kitchen._id);
                                kitchen.order_id = order._id
                                await kitchen.save();
                                break;
                            case 'shower':
                                var shower = new Shower(products[i]);
                                await shower.save();
                                await order.showers.push(shower._id);
                                shower.order_id = order._id
                                break; 
                             case 'stairs':
                                var stair = new Stairs(products[i]);
                                await stair.save();
                                await order.stairs.push(stair._id);
                                stair.order_id = order._id
                                break; 
                            case 'window':
                                var window = new Window(products[i]);
                                await window.save();
                                await order.windows.push(window._id);
                                window.order_id = order._id
                                break;                        
                        }
                        
    
    
                        
                    }
                    //console.log(order)
                    await order.save(req.user);
                    const order1 = await Order.findOne({_id:order.id}).populate('windows kitchens showers stairs customer_id status project_id');
                    res.status(200).send(order1);
                
            }
            catch(error){
                console.log(error);
                res.status(400).send(error);
            }
        });

app.get('/order',async(req,res)=>{
    try{
        var userRole=  req.user.role_name;
        if((userRole=="system manager") || (userRole=="clerk") || (userRole =="foreman") ){
        const id = req.query.id;
              if(id){
                if(!ObjectId.isValid(id)){
                return res.status(400).send(error);
             }
            
            const order = await Order.findById(id).populate('windows kitchens showers stairs customer_id status project_id');
            if(!order){
                return res.status(400).send(error);
            }
             
            return res.status(200).send(order);
        }
        const orders= await Order.find().populate('windows kitchens showers stairs customer_id status project_id');;
        if(!orders){
            return res.status(400).send(error);  
        }
         return res.status(200).send(orders);
        } else{
            switch(userRole){
                case 'cutting a kitchen':
                 const orders = await Order.find({status_id:"5addb62d08487c3448fceca5"})   
                
            }
        }
    }
    catch(error){
        console.log(error);
         res.status(400).send(error); 
    }

});
app.patch('/order/:id',async(req,res)=>{
    try{
        const id= req.params.id;
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }

       const order = await Order.findById(id);
        if(!order){
         return res.status(400).send(error);  
       }
    
       set_key_value(req.body,order);
       order.save(req.user);
        res.status(200).send(order);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

app.delete('/product',async(req,res)=>{
    try{
        const id = req.query.id;
        const type = req.query.type;
        
        if(!ObjectId.isValid(id)){
          return res.status(400).send(error);
        }
                
        switch(type){
            case 'kitchens':

                deleteProducts(id,Kitchen,type);
            break;
            case 'showers':
                deleteProducts(id,Shower,type);
            break; 
            case 'stairs':
                deleteProducts(id,Stairs,type);
            break; 
            case 'windows':
                deleteProducts(id,Window,type);
            break;                        
        }
       res.status(200).send('Good');
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

async function deleteProducts(id, model, type){
    try {
        var product = await model.findById(id);
        const order = await Order.findById(product.order_id);
        var array = order[type];
        console.log(array);
        order_id= product.order_id
        const update_order = await Order.findByIdAndUpdate({_id:order_id},{$pull:{array:id}},{new:true});
        await product.update({
            deleted:true
        });
        await product.save();
    } catch(error){
        console.log(error);
    }
}
