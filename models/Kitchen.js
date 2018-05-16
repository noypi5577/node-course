const {mongoose}=require('./../db/mongoose')
 var KitchenSchema= new mongoose.Schema({
    marble:{
        type: String,
        require:true,
        trim:true
    
    },kantim:[{
        type:Number,
        require:true,
        trim:true
    }],
    back_line:[{
            type:Number,
    }],
   sink:{
        type:Boolean,
        require:true,
        default: false
    },
    stove_top_length:[{
            type:Number,
            require:true  
    }],
    deleted:{
        type:Boolean,
        default:false
    },
    has_sizes:{
        type:Boolean,
        default:false,
        required:true
    },
    order_id:[{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }]    
 })
//  KitchenSchema.pre('save', function(next,req){
//     if(req.flag){
//         var kitchen = this.toJSON() 
//         var my_keys= Object.keys(kitchen)
//         var new_changes= {}
//          for(var i=0;i<my_keys.length;i++){
//             if(this.isModified(my_keys[i])){
//                 new_changes[my_keys[i]] = kitchen[my_keys[i]];
//                    next()
//                } else{
//                    next();
//                }
//         }   
//         if(new_changes.length>0){
//             console.log(new_changes)
//             var history= new History()
//             history.changes = new_changes
//             history.order_id= order._id;
//             history.user_id= req._id
//             history.created_at= history._id.getTimestamp()
//             history.save().then(saved=>{
//                 console.log("changes saved successfully")
//             }).catch(error=>{
//                 console.log(error)
//             });
//         }else{
//             console.log("no changes happend at current order") 
//         }
//     }else{
//         console.log("no changes happend at current order")
//     }
          
// });



 var Kitchen = mongoose.model('Kitchen', KitchenSchema);
 module.exports={Kitchen};