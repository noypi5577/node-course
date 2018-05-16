const {app}= require('./../server/server');
const{Projects}=require('./../models/Projects');
const {User}=require('./../models/User')
const {middleware}= require('./../middlewareFunction/middleware')

app.post('/projects',middleware.clerkForman,async(req,res)=>{
    try{
        middleware
        var body= req.body
        var project = new Projects(body)
        await project.save();
        res.status(200).send(project);
    }
    catch(error){
        res.status(400).send(error);
    }
})
app.get('/projects',middleware.projectManager,async(req,res)=>{
    try{
        const projects= req.user.allProjects
        if(projects.length>0){
            const id = req.user._id
            const user= await User.findById(id).populate('allProjects');
            res.status(200).send(user.allProjects)
        }else{
            res.status(200).send('this manager has no projects')
        }
       
    }
    catch(error){
        res.status(400).send(error);
    }
})

app.get('/allProjects',middleware.clerkForman,async(req,res)=>{
    try{
         
            const projects= await Projects.find()
            if (!projects){
                res.status(200).send('there is no projects existing yat')
   
            }
            res.status(200).send(projects)   
    }
    catch(error){
        res.status(400).send(error);
    }
})



app.get('/projects/:id',middleware.ordersOfProject,async(req,res)=>{
    try{
        const id = req.params.id;
        const project= await Projects.findById(id).populate('orders');
       console.log(project)
        const orders= project.orders
        if(orders.length>0){
            res.status(200).send(project)
        }else{
            res.status(200).send('this project has no orders')
        }
       
    }
    catch(error){
        res.status(400).send(error);
    }
})

// app.get('/order',authenticateClerkForman,async(req,res)=>{
//     try{
//         const id = req.query.id;
//         console.log(id);
//         if(id){
//                 if(!ObjectId.isValid(id)){
//                 return res.status(400).send(error);
//              }
            
//             const order = await Order.findById(id).populate('windows kitchens showers stairs customer_id status project_id');
//             if(!order){
//                 return res.status(400).send(error);
//             }
             
//             return res.status(200).send(order);
//         }
//         const orders= await Order.find().populate('windows kitchens showers stairs customer_id status project_id');;
//         if(!orders){
//             return res.status(400).send(error);  
//         }
//         return res.status(200).send(orders);
//     }
//     catch(error){
//         console.log(error);
//          res.status(400).send(error); 
//     }

// });