var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/aakash',{ useNewUrlParser: true },(err)=>{
	if(!err){
		console.log("connection succeeded hurray!");
	}else{
		console.log("connection error: " + err);
	}
});

var registerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	emailId:String,
	collegeName: String,
	eventName: String,
    genderType:String,
	created:{type: Date,default: Date.now}
});

var Register = mongoose.model("Register",registerSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
	res.render("index");
});

app.get("/engineering",(req,res)=>{
	res.render("engineering"); 
});

app.get("/foundation",(req,res)=>{
	res.render("foundation");
});

app.get("/register",(req,res)=>{
	res.render("register");
});
 app.get("/gallery",(req,res)=>{
	res.render("gallery");
});

app.get("/medical",(req,res)=>{
	res.render("medical");
});

app.get("/about",(req,res)=>{
	res.render("about");
});

app.get("/home",(req,res)=>{
	res.render("home");
});

app.get("/script",(req,res)=>{
	res.render("script");
});

app.post("/participants",(req,res)=>{
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var collegeName = req.body.classes;
	var eventName = req.body.stream;
	var emailId = req.body.email;
	var participant = {
		firstName : firstName,
		lastName : lastName,
		collegeName : collegeName,
		eventName : eventName,
		emailId : emailId,
	};
	Register.create(participant);
	res.redirect("/students");
});

app.get("/students",(req,res)=>{
	Register.find({}).then(registers =>{
		res.render("students",{registers : registers});
	}).catch(err=>{
		console.log(err);
	});	
});

app.listen(3000,()=>{
	console.log("server is running");
});
