var mongoose= require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/MarbleApp', (err,client)=>{
    if(err){
        return console.log(err);
    }
    console.log('conected to the url address')
});

//mongoose.connect(process.env.MONGODB_URI);
module.exports={mongoose};