
const {app}= require('./../server/server');
var express= require('express');
var bodyParser= require('body-parser');
const _ = require('lodash');
const {User}= require('./../models/User'); 
const {mongoose}= require('./../db/mongoose');
const{generateAuthToken}=require('./../models/User')
const{findByCredentials}=require('./../models/User');
const {middleware}=require('./../middlewareFunction/middleware')
const ObjectId= mongoose.Types.ObjectId;
//[middleware.requireAuthentication,middleware.systemManager]

app.post('/users', async(req,res)=>{
    try{
         
        var body =req.body
        var user= new User(body)
        const token= await user.generateAuthToken()
        await user.save();
        const user1 = await User.findOne(user._id).populate('role_id');
        res.status(200).send(user1)
      
    }catch(error){
        console.log("error",error);
        res.status(400).send(error)
    }
})
app.post('/users_login', async(req,res)=>{
    try{
        const body= _.pick(req.body,['email','password']);
        const user= await User.findByCredentials(body.email,body.password)     
        const token= await user.generateAuthToken()
         res.header('x-auth',token).send( user);
        
        
    }  catch(error){
        console.log(error)
        res.status(400).send('error');
        }
});

app.get('/users',[middleware.requireAuthentication,middleware.clerkForman],async(req,res)=>{
   try{
        const queries=Object.keys(req.query)
        if(queries.length>1){
            return res.status(400).send('you can sand only one param')
        }
       const id= req.query.id;
       if(id){
           if(!ObjectId.isValid(id)){
            return res.status(400).send('id is not valid')
           }
        const user= await User.findById(id)
        if(!user){
           return res.status(400).send('no user found')  
        }
        return res.status(200).send(user)
       }
    const role_id = req.query.user_role_id
    if(role_id){
        if(!ObjectId.isValid(role_id)){
         return res.status(400).send('invalid role_id')
        }
     const users= await User.find({user_role_id:role_id});
     if(!users){
        return res.status(400).send('no user found');  
     }
     return res.status(200).send(users)
    }
    const allUsers= await User.find();
    if(!allUsers){
        return res.status(400).send('no users found');  
    }
    return res.status(200).send(allUsers);
   }catch(error){
    console.log(error);
    res.status(400).send(error); 
   }
    
 });


 app.patch('/changed_passsword', (req,res)=>{
     
         const password= req.body.recent_password;
         console.log("123",password);
         const email= req.body.email;
         User.findByCredentials(email,password).then((user)=>{
            const new_password= req.body.new_password
            const confirm_password= req.body.confirm_password
            if(!new_password===confirm_password){
                return res.status(400).send('new password is not match confirm password ') 
            } 
            user.password = new_password;
            return user.save();


     }).then(saved => {
        res.status(200).send('password changed successfully')
     }).catch(error => {
        res.status(400).send(error)

     })
 })

