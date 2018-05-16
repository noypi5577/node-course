const {mongoose}=require('./../db/mongoose')
 var UserSchema= new mongoose.Schema({
    commend:{
        type: String,
        required:true
    },
    stair:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Stairs'
    },
    window:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Window'
    },
    shower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shower'
    },
    kitchen:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kitchen'
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }
    
 }) 
 var Repair = mongoose.model('Repair', UserSchema);
 module.exports={Repair};