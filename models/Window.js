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
    },
    window_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    }    
})
 
var Window= mongoose.model('Window',UserSchema);
module.exports ={Window}; 