var mongoose= require('mongoose');
mongoose.Promise = global.Promise;



mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/MarbleApp', (err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('123 conected to the url address'+ client)
});


module.exports={mongoose};