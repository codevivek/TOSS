const express=require('express');
const app=express();
const router=express.Router();
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt');
const nodemailer = require('nodemailer');
const uuid = require("uuid-random")
const User=require('../schemas/UserSchema')

app.set("view engine", "pug");
app.set("views","views");
app.use(bodyParser.urlencoded({ extended:false}));

router.get("/",(req,res,next)=>{
    res.status(200).render("register"); 
})

router.post("/",async (req,res,next)=>{

    const uniqueId = uuid()
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
   var userName=req.body.userName.trim();
   var email=req.body.email.trim();
   var password=req.body.password;

   
   var payload=req.body;
   if(firstName && lastName && userName && email && password) {
    var user = await User.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    })
    .catch((error) => {
        console.log(error);
        payload.errorMessage = "Something went wrong.";
        res.status(200).render("register", payload);
    });

    if(user == null) {
        // No user found

        var data = req.body;
        data.password = await bcrypt.hash(password, 10);
        User.create(data)
        .then((user) => {
            req.session.user=user;
            payload.status = "We have sent you an email with a link to confirm your registration. If you don't see it in your inbox, please check your spam folder"
            return res.status(200).render("register", payload)
        })
    }
    else {
        // User found
        if (email == user.email) {
            payload.errorMessage = "Email already in use.";
        }
        else {
            payload.errorMessage = "Username already in use.";
        }
        res.status(200).render("register", payload);
    }
}
    else {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("register", payload);
    } 
    var transporter = nodemailer.createTransport({
        host: "gmail",
        auth: {
          user: "networktoss@gmail.com",
          pass: "ejxrvlneezkfogpt"
        },
        port:465,
        host:'smtp.gmail.com'
      });
  
    var mailOptions = {
        from: 'Toss',
        to: email,
        subject: 'Registration Confirmation',
        html: `Thank you for registering with us. The next step is to verify your identity. 
        <p>Please follow this link to confirm your registration:</p>
        <a href="https://tossnetwork.herokuapp.com/login?id=${uniqueId}">Click here</a>` 
    }
  
    transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            const updateUser = await User.findOne({email: email})
            .catch(() => {
                payload.statusMessage = "Something went wrong. Please try again."
                return res.status(400).render("register", payload)
            })
            payload.statusMessage = "Something went wrong. Please try again"
            return res.status(400).render("register", payload)
        } else {
        console.log('Email sent: ' + info.response)
        }
    })

   
    
});



module.exports=router;