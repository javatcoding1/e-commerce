const express=require("express");
const app=express();
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const bycrypt=require("bcrypt")
app.set("view engine","ejs")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
//login page schema and data and password encrypt


mongoose.connect("mongodb+srv://jayanth:jayanth@cluster0.8himuj3.mongodb.net/jayanth",{useNewUrlParser:true})
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log("not able to connect to db")
})

mongoose.set('strictQuery', false)
mongoose.set('strictQuery', true);

var logindataschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
var cartdata =new mongoose.Schema({
    name:String,
    size:String,
    no:Number,
    subtotal:Number
})
const Cartdata=mongoose.model("Cartdata",cartdata)
var size=""
var no=""
var subtotal=""
const Logindata=mongoose.model("Logindata",logindataschema)
var name=""
var password=""
var email=""
app.get("/home",(req,res)=>{
    res.render("home")
})
app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/", async(req, res) => {
    name = req.body.username;
    password = req.body.password;
     const username=await Logindata.findOne({name:name})
     const isMatch=await bycrypt.compare(password,username.password)
     console.log(isMatch)
    
     if(isMatch){
      res.redirect("/home");
     }
   
     else{
      res.redirect("/")
     }
})
app.post("/register",async(req,res)=>{
    const passwords=async (password)=>{
        const passwordhash=await bycrypt.hash(password,12)
        return  passwordhash
    }
 var p=await passwords(req.body.passwordss)

    var registerdata=new Logindata({
        name:req.body.username,
        email:req.body.email,
        password:p
    })
    registerdata.save()
    res.redirect("/home")
})
app.get("/product",(req,res)=>{
    res.render("product")
})
app.post("/product",(req,res)=>{
    res.redirect("product")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.post("/about",(req,res)=>{
    res.redirect("about")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})
app.post("/contact",(req,res)=>{
    res.redirect("contact")
})
app.get("/account",(req,res)=>{
    res.render("account")
})
app.post("/account",(req,res)=>{
    res.redirect("account")
})
app.get("/cart",(req,res)=>{
    res.render("cart")
})

app.get("/product-detials",(req,res)=>{
    res.render("product-detials")
})

var price=""

let a=""
app.get("/num",(req,res)=>{
    res.render("/cart")
})
app.post("/num",(req,res)=>{
    a=req.body.number*4000
    console.log(a)
    res.redirect("/cart",{price:a})
})

app.listen(3000,(req,res)=>{
    console.log("server is on")
})