const {mongoose}=require('./../db/mongoose')
const ObjectId= mongoose.Types.ObjectId;
var UserSchema= new mongoose.Schema({
    changes:{
         required:true,
         type:Object
        }, 
    order_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Order'
},user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'  
},created_at:{
    type:Date,

}
})



var History= mongoose.model('History',UserSchema)
module.exports= {History}