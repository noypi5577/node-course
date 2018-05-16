const {app}= require('./../server/server');
const{mongoose}=require('./../db/mongoose');
const {Customer}=require('./../models/Customer');


app.post('/customer',async(req,res)=>{
    try{
        var body= req.body
        var customer = new Customer(body)
        await customer.save();
        res.status(200).send(customer);
    }
    catch(error){
        res.status(400).send(error);
    }
})

