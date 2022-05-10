const express=require('express');
const app=express();
const port=4000;
const middleware=require('./middleware')
const path=require('path')
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://admin:dbadmin@cluster0.3lisj.mongodb.net/tossDb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Database connection successful");
})
.catch(()=>{
    console.log("Database connection not successful");
})

const server=app.listen(port,()=>console.log("Sever listening on port "+port));

app.set("view engine", "pug");
app.set("views","views");

app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname,"public")));

//Routes
const loginRoute=require('./routes/loginRoutes');
app.use("/login",loginRoute);
const registerRoute=require('./routes/registerRoutes');
app.use("/register",registerRoute);

app.get("/",middleware.requireLogin,(req,res,next)=>{

    var payload={
        pageTitle: "Home"
    }
    res.status(200).render("home",payload); 
})