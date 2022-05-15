const mongoose = require("mongoose");


class Database{

    constructor(){
        this.connect();
    }
    
    connect(){
        mongoose.connect("mongodb+srv://admin:dbadmin@cluster0.3lisj.mongodb.net/tossDb?retryWrites=true&w=majority")
        .then(()=>{
            console.log("Database connection successful");
        })
        .catch((err)=>{
            console.log("Database connection not successful"+err);
        })
    }
}

module.exports=new Database();