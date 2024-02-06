const express = require("express");
const router1 = require('./route');
require("dotenv").config();;
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,token ,Authorization");
    res.header( "Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT" ),
    next();
});

app.use("/",router1);
app.get("/home",(req,res)=>{
    res.send("its home page")
})
const port = 3001;

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
