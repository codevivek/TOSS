const express=require('express');
const app=express();
const router=express.Router();
const bodyParser=require('body-parser')

app.set("view engine", "pug");
app.set("views","views");
app.use(bodyParser.urlencoded({ extended:false}));

router.get("/",(req,res,next)=>{
    res.status(200).render("register"); 
})

router.post("/",(req,res,next)=>{
   var name=req.body.name.trim();
   var userName=req.body.userName.trim();
   var email=req.body.email.trim();
   var password=req.body.password;

   var payload=req.body;
   if(name && userName && email && password){

   }else{
    payload.errorMessage="Make sure each feild has a valid input";
    res.status(200).render("register",payload); 
   }

})

module.exports=router;