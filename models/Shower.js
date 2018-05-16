const {mongoose}=require('./../db/mongoose')
 var UserSchema= new mongoose.Schema({
    marble:{
        type: String,
        require:true,
        trim:true
    },kantim:{
        type:Number,
        require:true,
        trim:true
    },kant_length:[{
        type:Number,
        trim:true
    }],back_line:{
        type:Boolean,
        default: false
    },back_line_length:[{
         type:Number,
    }],
   sink:{
        type:Boolean,
        default: false
    },
    has_sizes:{
        type:Boolean,
        default:false,
        required:true
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }    
 })

 var Shower = mongoose.model('Shower', UserSchema);
 module.exports={Shower};