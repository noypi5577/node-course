var {mongoose}= require('./../db/mongoose');
var express= require('express');
var bodyParser= require('body-parser');
const _ = require('lodash');
const {User}= require('./../models/User');
const {Role_type}= require('./../models/Role_type');
const{Window}=require('./../models/Window');
const {Order}=require('./../models/Order');
const {Shower}= require('./../models/Shower');
const{Kitchen}=require('./../models/Kitchen');
const {middleware}=require('./../middlewareFunction/middleware')


 



const port= process.env.PORT || 3000
var app= express();
app.use(bodyParser.json());

app.use(middleware.requireAuthentication)
 //app.use("/users/*",middleware.systemManager)
 //app.all( "/users" , middleware.clerkForman);
// app.use("/customer event history kitchen order roles shower status",middleware.clerkForman)
 app.use("/customer",middleware.clerkForman)
 app.use("/event",middleware.clerkForman)
 app.use("/history",middleware.clerkForman)
 app.use("/kitchen",middleware.clerkForman)
 app.use("/order",middleware.clerkForman)
 app.use("/roles",middleware.clerkForman)
 app.use("/shower",middleware.clerkForman)
 app.use("/status",middleware.clerkForman)
 
 
 

app.listen(port,()=>{
    console.log('starting to listen to:'+ port);

})
module.exports={app}

require('./../controller/customer_controler')
require('./../controller/event_controler')
require('./../controller/history_controler')
require('./../controller/kitchen_controler')
require('./../controller/order_controler')
require('./../controller/projects_controler')
require('./../controller/role_type_controler')
require('./../controller/shower_controler')
require('./../controller/status_controler')
require('./../controller/user_controler');
require('./../controller/repair_controler');


