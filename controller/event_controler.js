const {app}= require('./../server/server');
const{mongoose}=require('./../db/mongoose');
const {Event}= require('./../models/Event');
const {User}= require('./../models/User');
const{Order}=require('./../models/Order')
//const {authenticateClerkForman}= require('./../middlewear/authenticateClerkForman');
const ObjectId= mongoose.Types.ObjectId;
const _=require('lodash');

app.post('/event', (req,res)=>{
    
    const order_id= req.body.order_id;
    if(!ObjectId.isValid(order_id)){
        return res.status(400).send('id is not valid')
       }
   Order.findById(order_id).then((order)=>{
       if(order.status_id!='5ae17f23388ffe1cbceccab1'){
        return res.status(400).send('order is not on status- pending installation')   
       }
       const user_id = req.body.user_id
       if(!ObjectId.isValid(user_id)){
        return res.status(400).send('id is not valid')
       }
       User.findById(user_id)
   }).then((user)=>{
       console.log(req.body)
     var timestemp= new Date(req.body.timestemp)
    console.log("123",timestemp);
       var event = new Event(req.body)
       event.created_at= timestemp;
       return event.save();
   }).then(saved => {
    res.status(200).send('event created successfully');

 }).catch(error => {
     console.log(error)
   res.status(400).send(error)

})
})