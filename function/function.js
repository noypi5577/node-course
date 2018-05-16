
var set_key_value= (body,instance)=>{
    for(var key in body){
        if(body.hasOwnProperty(key)){
            instance[key]=body[key];
        }
    }
}  


module.exports={set_key_value}