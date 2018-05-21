const {mongoose}=require('./../db/mongoose')
const{ObjectID}=require('mongodb')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');



var UserSchema= new mongoose.Schema(
    {
      email:{
      type:String,
      required:true,
      trim: true,
      minlength:1,
      unique: true,
      validate:{
            validator: validator.isEmail,
            message:'{value} is not a valid email'
        }
     },
        first_name:{
            type: String,
            require:true,
            trim:true
        },
        last_name:{
            type: String,
            require:true,
            trim:true
        },
             active:{
            type:Boolean,
            require:true,
            default: true
        },
        password:{
            type: String,
            require:true,
            trim:true,
            minlength:6
            
        },
        phone:{
            type: String,
            require:true,
            trim:true,
            minlength:10
        },
        tokens:[{
            access:{
                required:true,
                type:String
            },
            token:{
                type: String,
                required: true
            }
    
        }],
            role_id:{
             type:mongoose.Schema.Types.ObjectId,
             ref:'Role_type',
            required:true,   
        }, 
        allProjects:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Projects'
        }]


    }
)
UserSchema.methods.toJSON = function(){
    var user= this;
    var userObject= user.toObject();
    return userObject
    };

UserSchema.pre('save', function(next){
    var user = this; 
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
               user.password=hash;
                next();
            });
      });

    } else
          next();

});
UserSchema.methods.generateAuthToken= function() {  
    process.env.JWT_SECRET="1234567890" 
    var user= this;
    var access='auth';
    var token = jwt.sign({_id: user._id,access},process.env.JWT_SECRET).toString();
    
    user.tokens= user.tokens.concat([{access,token}]);
    
    return user.save().then(()=>{
        
    return token; 
    });
    };

    UserSchema.statics.findByCredentials = function(email,password){
        var User= this;
        return User.findOne({email}).then((user)=>{
            if(!user){
                return Promise.reject('wrong password');
            }
            return new Promise((resolve,reject)=>{
                bcrypt.compare(password,user.password,(err,res)=>{
                    if(res===true){
                        resolve(user);
                    } 
                    reject("match password not found on database");
                });
            });
        });
    };

    UserSchema.statics.findByToken=function(token){
        var User=this;
        var decoded;
        try{
            decoded= jwt.verify(token,"1234567890" ) 
            if(!decoded){
                return reject('token or secret_key is invalid');
            }
            
           return User.findOne({
           _id:decoded._id,
            'tokens.token':token,
            'tokens.access':'auth'}).populate('role_id') 
           
        }catch(error){
         return Promise.reject()
        }
        

    }

var User= mongoose.model('User', UserSchema);
module.exports={User}