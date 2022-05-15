const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const UserSchema=new Schema({
    fullname:{type:String,required:true,trim:true},
    userName:{type:String,required:true,trim:true,sparse:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:"/img/doodle.jpg"}
},{timestamps:true});

var User=mongoose.model('User',UserSchema);
module.exports=User;