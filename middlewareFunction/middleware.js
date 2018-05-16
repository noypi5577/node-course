const {User}= require('./../models/User')


var middleware={
    requireAuthentication:function(req,res,next){
        console.log("from authenticate")
        var token= req.header('x-auth')
        User.findByToken(token).then((user)=>{
            if(!user){   
                return Promise.reject("this user is not exist");
            }
            if(!user.role_id.name){
                return Promise.reject("this user has no role type"); 
            }
            req.user= user;
            req.token= token;
            req.userRole= user.role_id.name        
            next();
        }).catch((e)=>{
            res.status(401).send();
        });
    
    },

    systemManager:function (req,res,next){
        console.log(req.userRole)
        if(req.userRole!="system manager"){
         return res.status(400).send("this user is not autherized for this action")
         }else{ 
             return next()
              }
    },

    clerkForman:function(req,res,next){
        console.log("from clerckforman",req.userRole)

    if((req.userRole=="system manager") || (req.userRole=="clerk") || (req.userRole =="foreman") ){
         next();
    }else{
        return res.status(400).send("user is not authorized")  
         }    
    },

    projectManager: function (req,res,next){
    if((req.userRole=="system manager") ||(req.userRole =="project_manager" )){
     next();
   }else{
    return res.status(400).send("A user is not authorized to perform the requested action")  
        }
   },

   ordersOfProject:function(req,res,next){
    console.log("from ordersofprojects",req.userRole)

    if((req.userRole=="system manager") || (req.userRole=="clerk") || (req.userRole =="foreman") ||(req.userRole =="project_manager" ) ){
     next();
    }else{
    return res.status(400).send("user is not authorized")  
     }    
}, 

} 
 
    module.exports={middleware}  