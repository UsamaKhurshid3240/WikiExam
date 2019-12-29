const express = require('express');
const app = express();
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./server');

const mongoose = require('mongoose');
var cors = require('cors');
const passport =require( 'passport');
const path =require('path');
const { Strategy } =require( 'passport-facebook');
const firebase=require('firebase');
const firebaseauth=require('firebaseauth');
 const  nodeMailer = require('nodemailer');

var rn = require('random-number');




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAKIJbWsdFD60kX19F9pfn6fL9O-HO_KM0",
    authDomain: "mad-project-403b5.firebaseapp.com",
    databaseURL: "https://mad-project-403b5.firebaseio.com",
    projectId: "mad-project-403b5",
    storageBucket: "",
    messagingSenderId: "939110839047",
    appId: "1:939110839047:web:c6f3ea3489f8103e604ba2",
   
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);





var provider = new firebase.auth.FacebookAuthProvider();


let session = require('express-session');
mongoose.connect('mongodb://localhost:27017/Student', {useNewUrlParser: true,useUnifiedTopology:true});




const Student = mongoose.model('Student', {
  name: String,
  email: String,
  password: String,
  gender:String,
  role:String,
  mbnumber:String,
  dob:String,
  reg:String,
  age:String,
  date_added: Date,

 });
 const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());




app.post('/send-email', function (req, res) {
var options = {
  min:  10000
, max:  99999
, integer: true

}

      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'wikiexam332@gmail.com',
              pass: 'madproject123'
          }
      });
var code=rn(options).toString();
      let mailOptions = {
          from: '"Wiki Exam" <WikiExam332@gmail.com>', // sender address
          to: "hamza.bsse3349@iiu.edu.pk", // list of receivers
          subject: "Test", // Subject line
          text: code, // plain text body
          html: req.body.body// html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.send({
    message: 'Verification Successful',
code:code
  });
          });
      });
         


  
app.post('/signup', async (req, res) => {
  const body = req.body;
  console.log('req.body', body)
    try{
  const student = new Student(body);



  const result = await student.save();

  firebase.database().ref('WikiExam').child(req.body.role).push({

    username: student.name,
    email: student.email,
    password:student.password,
    gender:student.gender,
    role:student.role,
    mobilenumber:student.mbnumber,
    dob:student.dob,
    reg:student.reg,
    age:student.age
    
  });


  res.send({
    message: 'Signup Successful'
  });

    }
    catch(ex){
      console.log('ex',ex);
      res.send({message: 'Error'}).status(401);
    }
})



app.post('/addquiz', async (req, res) => {
  const body = req.body;
  console.log('req.body', body)
    try{
 

  firebase.database().ref('WikiExam').child('Quizes').push({

   correctAnswer:req.body.correctAnswer,
   Option4:req.body.option4,
   Option3:req.body.option3,
   Option2:req.body.option2,
   Option1:req.body.option1,
   Question:req.body.question
  });


  res.send({
    message: 'Save Quiz	'
  });

    }
    catch(ex){
      console.log('ex',ex);
      res.send({message: 'Error'}).status(401);
    }
})




app.get('/quizes', async (req, res) => {


var ref = firebase.database().ref('WikiExam').child('Quizes');

var s=[];

ref.on("value", function(snapshot) {

snapshot.forEach(function(snap){
             s .push(snap.key);
            console.log(s);
  });

console.log("usama"+s);
   console.log(snapshot.val());
const student=new Student(snapshot.val());
var quizes=snapshot.val();
 
res.json({
           
           quizes:quizes,
         s:s
         });


}, function (error) {
   console.log("Error: " + error.code);
});



});





app.get('/students', async (req, res) => {


var ref = firebase.database().ref('WikiExam').child('Student');

var s=[];

ref.on("value", function(snapshot) {

snapshot.forEach(function(snap){
             s .push(snap.key);
            console.log(s);
  });

console.log("usama"+s);
   console.log(snapshot.val());
const student=new Student(snapshot.val());
var students=snapshot.val();
 
res.json({
           
           students:students,
         s:s
         });


}, function (error) {
   console.log("Error: " + error.code);
});



});

app.get('/teachers', async (req, res) => {


var ref = firebase.database().ref('WikiExam').child('Teacher');

var s=[];

ref.on("value", function(snapshot) {

snapshot.forEach(function(snap){
             s .push(snap.key);
            console.log(s);
  });

console.log("usama"+s);
   console.log(snapshot.val());

var teachers=snapshot.val();
 
res.json({
           
           teachers:teachers,
         s:s
         });


}, function (error) {
   console.log("Error: " + error.code);
});



});



app.post('/st', async (req, res) => {


var email=req.body.email;
var pass=req.body.password;
var rol=req.body.role;

console.log("dddd"+email+rol);

if (rol=="Student"){

//Find One and get key
firebase.database().ref('WikiExam').child('Student').orderByChild("email").equalTo(email).on("child_added", snap => {
 console.log(snap.key);
var dd=snap.val();

console.log("data"+dd);





//Delete
//firebase.database().ref('Students').child('-LwQ0GrYoZpPeRjBnCyl').remove();

//Update
//firebase.database().ref('Students').child('-LwND_H8FTqiU3TuilWF').update({ password: "123" });

 let username = email;
    let password = pass;
  
    let mockedUsername = snap.val().email;
    let mockedPassword = snap.val().password;
    let role=snap.val().role;
    let name=snap.val().username;
   
   
    let reg=snap.val().reg;
    let dob=snap.val().dob;
    let age=snap.val().age;
    let gender=snap.val().gender;
    let mobilenumber=snap.val().mobilenumber;



console.log("Role"+role);
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username,role:role,name:name,gender:gender,dob:dob,age:age,reg:reg,mobilenumber:mobilenumber,password:password},
          config.secret,
          { expiresIn: '1h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,

        });
      } else {
        res.json({
          success: false,
          message: 'Incorrect username or password',
token:null
        });
      }
    } 


});
}
else if (rol=="Teacher"){
firebase.database().ref('WikiExam').child('Teacher').orderByChild("email").equalTo(email).on("child_added", snap => {
 console.log(snap.key);
var dd=snap.val();

console.log("data"+dd);





//Delete
//firebase.database().ref('Students').child('-LwQ0GrYoZpPeRjBnCyl').remove();

//Update
//firebase.database().ref('Students').child('-LwND_H8FTqiU3TuilWF').update({ password: "123" });

 let username = email;
    let password = pass;
  
    let mockedUsername = snap.val().email;
    let mockedPassword = snap.val().password;
    let role=snap.val().role;
console.log("Role"+role);
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username,role:role},
          config.secret,
          { expiresIn: '1h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token,

        });
      } else {
        res.json({
          success: false,
          message: 'Incorrect username or password',
token:null
        });
      }
    } 


});

}

});

app.post('/update', async (req, res) => {
  const body = req.body;
  console.log('req.body', body)
    try{
  const student = new Student(body);


if(req.body.role==="Student"){
//Find One and get key
firebase.database().ref('WikiExam').child('Student').orderByChild("reg").equalTo(req.body.reg).on("child_added", snap => {
 console.log(snap.key);
var dd=snap.val();

console.log("data"+dd);
//Update
firebase.database().ref('WikiExam').child('Student').child(snap.key).update({username:req.body.name, email:req.body.email,password: req.body.password,gender:req.body.gender,role:req.body.role,mobilenumber:req.body.mbnumber,dob:req.body.dob,reg:req.body.reg,age:req.body.age });
});
}

else if(req.body.role==="Teacher"){
//Find One and get key
firebase.database().ref('WikiExam').child('Teacher').orderByChild("reg").equalTo(req.body.reg).on("child_added", snap => {
 console.log(snap.key);
var dd=snap.val();

console.log("data"+dd);
//Update
firebase.database().ref('WikiExam').child('Teacher').child(snap.key).update({username:req.body.name, email:req.body.email,password: req.body.password,gender:req.body.gender,role:req.body.role,mobilenumber:req.body.mbnumber,dob:req.body.dob,reg:req.body.reg,age:req.body.age });
});
}
 


  res.send({
    message: 'Update Successful'
  });

    }
    catch(ex){
      console.log('ex',ex);
      res.send({message: 'Error'}).status(401);
    }
});



app.post('/delete', async (req, res) => {
  const body = req.body;
  console.log('req.body', body)
    try{
  const student = new Student(body);


if(req.body.role==="Student"){
//Find One and get key
firebase.database().ref('WikiExam').child('Student').orderByChild("reg").equalTo(req.body.reg).on("child_added", snap => {
 console.log(snap.key);
var dd=snap.val();

console.log("data"+dd);
//Delete
firebase.database().ref('WikiExam').child('Student').child(snap.key).remove();
});
}

else if(req.body.role==="Teacher"){
//Find One and get key
firebase.database().ref('WikiExam').child('Teacher').orderByChild("reg").equalTo(req.body.reg).on("child_added", snap => {
 console.log(snap.key);
var dd=snap.val();

console.log("data"+dd);
//Update
firebase.database().ref('WikiExam').child('Teacher').child(snap.key).remove();
});
}
 


  res.send({
    message: 'Delete Successful'
  });

    }
    catch(ex){
      console.log('ex',ex);
      res.send({message: 'Error'}).status(401);
    }
});

app.post('/login',  async (req, res) => {
  const body = req.body;
  console.log('req.body', body);

  const email = body.email;

  // lets check if email exists

  const result = await Student.findOne({"email":  email});
  if(!result) // this means result is null
  {
    
const tk=3;
 res.json({
          
          tk:tk
         });
       
  }
  else{
    // email did exist
    // so lets match password

    if(body.password === result.password){

      // great, allow this user access

      console.log('match'+email);
 const tk=1;
   res.json({
           
         tk:tk
         });
       

        
    }

      else{

        console.log('password doesnot match');

    const tk=2;  
 res.json({
          
        tk:tk
         });
       
      }


  }

});



app.post('/gg',  (req, res) => {
  const body = req.body;
  console.log('req.body', body)
    try{

  const student = new Student(body);

    firebase.auth().signInWithPopup(provider);



  console.log("USAMA"+f);
 
  res.send({
    message: 'Student signup successful'
  });

    }
    catch(ex){
      console.log('ex',ex);
      res.send({message: 'Error'}).status(401);
    }
})


app.listen(3000, () => {
  console.log('Express application running on localhost:3000');
});
