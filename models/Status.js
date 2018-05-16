const {mongoose}=require('./../db/mongoose')
var UserSchema= new mongoose.Schema(
    {
        name:{
            type: String,
            require:true,
            trim:true
        },  

    }
)
var Status= mongoose.model('Status',UserSchema);
module.exports={Status};