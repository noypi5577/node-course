const {app}= require('./../server/server');
const {Role_type}= require('./../models/Role_type');


app.post('/roles',async(req,res)=>{
    try{
        var body = req.body;
        var role_type= new Role_type(body);
        await role_type.save();
        res.status(200).send(role_type)
    }catch(error){
        res.status(400).send(error);
    }
})
