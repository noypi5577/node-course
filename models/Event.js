const {mongoose}=require('./../db/mongoose')
const ObjectId= mongoose.Types.ObjectId;

var UserScheme= new mongoose.Schema(
    {
        created_at:{
            type:Date,
            required:true
        },
        order_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Order'
        },user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'  
        }

        

    }
)
var Event= mongoose.model('Event',UserScheme);
module.exports={Event};