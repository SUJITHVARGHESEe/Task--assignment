const express = require('express');
const mongoose = require('mongoose');
const dotevn =require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const app =express()
app.use(express.json())
const userModel = require('./models/databaseModel')
const authRouts= require('./routes/auth')


mongoose.connect(process.env.URI).then(()=>{
    console.log("database is connected")
    app.listen(process.env.PORT || 8000, (err)=>{
        if(err){
            console.log(err);
        }else{ 
            console.log("server is running in ",process.env.PORT);
        }
    })
}).catch((err)=>{
    console.log(err)
})

app.use('/',authRouts)