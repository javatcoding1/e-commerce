const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const bycrypt=require("bcrypt")
app.set("viwe engine","ejs")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
mongoose.connect("mongodb+srv://jayanth:jayanth@cluster0.8himuj3.mongodb.net/jayanth",{useNewUrlParser:true})
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log("not connected to db")
})
const registerschema=new mongoose.Schema({
    
})