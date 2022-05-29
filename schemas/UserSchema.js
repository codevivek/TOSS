const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const UserSchema=new Schema({
    fullname:{type:String,required:true,trim:true},
    userName:{type:String,required:true,trim:true,sparse:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:"/img/user.png"},
    likes: [{type:Schema.Types.ObjectId,ref:'Post'}],
    retoss: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{timestamps:true});

var User=mongoose.model('User',UserSchema);
module.exports=User;