const {mongoose}=require('./../db/mongoose')
const {History}= require('./../models/History')

var OrderSchema= new mongoose.Schema({
       street_adress:{
        type:String,
        required:true,
        trim:true
    },
    bilding_number:{
        type:String,
        trim:true 
    },
    house_number:{
        type:String,
        trim:true  
    },
    zip_code:{
        type:String,
        trim:true  
    },
    city:{
        type:String,
        required:true,
        trim:true  
    },
    commend:{
        type: String
    },
    paid:{
        type:Boolean,
        default:false,
        required:true
    },
    stairs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Stairs'
    }],
    windows:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Window'
    }],
    showers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shower'
    }],
    kitchens:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Kitchen'
    }],
    customer_id:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'  
    },
    status_id:{
        required:true, 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Status'
    },
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Projects'
    }

});

OrderSchema.pre('save', function(next,req){
    
        var order = this.toJSON() 
        var my_keys= Object.keys(order)
        var new_changes= {}
         for(var i=0;i<my_keys.length;i++){
            if(this.isModified(my_keys[i])){
                console.log(this.isModified(my_keys[i]))
           
           new_changes[my_keys[i]] = order[my_keys[i]];
           console.log(new_changes[my_keys[i]])
           
                   next()
               } else{
                   next();
               }
        }   
        console.log("123",new_changes)
        if(typeof new_changes !== 'undefined'&& new_changes){
            console.log("123",new_changes)
            var history= new History()
            history.changes = new_changes
            history.order_id= order._id;
            history.user_id= req._id
            history.created_at= history._id.getTimestamp()
            history.save().then(saved=>{
                console.log("changes saved successfully")
            }).catch(error=>{
                console.log(error)
            });
            
        }else{
            console.log("no changes happend at current order")    
        }
    
          
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = {Order}