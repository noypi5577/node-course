const {mongoose}=require('./../db/mongoose')
var UserScheme= new mongoose.Schema(
    {
        first_name:{
            type: String,
            require:true,
            trim:true
        },
        last_name:{
            type: String,
            require:true,
            trim:true
        },
        phone:{
            type: String,
            require:true,
            trim:true,
            minlength:10,
            unique:true
        // },order_id:{
        //     required:true,
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Order'
        }    
    }
)

var Customer= mongoose.model('Customer',UserScheme);
module.exports={Customer};