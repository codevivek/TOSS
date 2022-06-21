const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const UserSchema=new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName:{type:String,required:true,trim:true,sparse:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:"/img/user.png"},
    coverPhoto: { type: String },
    likes: [{type:Schema.Types.ObjectId,ref:'Post'}],
    retoss: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    resetPassword: {type: String},
    status: {
        type: String, 
        enum: ['Pending', 'Verified'],
        default: 'Verified'
    }
},{timestamps:true});

var User=mongoose.model('User',UserSchema);
module.exports=User; 