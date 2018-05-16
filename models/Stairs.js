const {mongoose}=require('./../db/mongoose')

var UserSchema= new mongoose.Schema({
    marble:{
        type: String,
        require:true,
        trim:true
    },kantin:{
        type: Number,
        require:true,
        trim:true
    },
    raizer_length:{
        type: Number,
        require:true,
        trim:true  
    },
    stairs_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }    
})

var Stairs= mongoose.model('Stairs',UserSchema)
module.exports= {Stairs};