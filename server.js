var express=require('express');
var nodemailer = require("nodemailer");
var app=express();

/*-------------------SMTP Start--------------------------*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "< E-MAIL ADDRESS >",
        pass: "< PASSWORD >"
    }
});

/*-------------------SMTP Over--------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(9999,function(){
    console.log("Server Running on Port 9999");
});