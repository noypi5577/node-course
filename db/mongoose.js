var mongoose= require('mongoose');
mongoose.Promise = global.Promise;



mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/MarbleApp', (err,client)=>{
    if(err){
        return console.log("error from connect"+ err);
    }
    console.log('conected to the url address')
});


module.exports={mongoose};