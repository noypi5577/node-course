const {mongoose}=require('./../db/mongoose')
var Userschema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            unique:true
        },
     
    }
)

var Role_type= mongoose.model('Role_type',Userschema)
module.exports={Role_type};