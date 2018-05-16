const {mongoose}=require('./../db/mongoose')
 var UserSchema= new mongoose.Schema({
     name:{
         required:true,
         type:String
     },
     city:{
        required:true,
        type:String  
     },
     adress:{
        required:true,
        type:String
     },
     project_manager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
     }]
    
 }) 
 var Projects = mongoose.model('Projects', UserSchema);
 module.exports={Projects};
 