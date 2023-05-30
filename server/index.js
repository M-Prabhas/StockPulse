const express = require("express");
require('dotenv').config()
const  nodemailer = require('nodemailer');
const app=express();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'Sai12373@outlook.com',
      pass: 'prabhas@1'
    }
  });



app.post("/whatsappshare",function(req,res){
        console.log(req.body.num,req.body.msg,req.body.mynum);
        client.messages
            .create({
                body:req.body.msg,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+918341407675' 
            })
            .then(message => console.log(message.sid))
            .done();
    });


app.post('/Emailshare',function(req,res){
    console.log(req.body.toemail,req.body.message,req.body.myemail,req.body.name); 
    const mailOptions = {
        from:'sai12373@outlook.com',
        to:req.body.toemail ,
        subject:'regarding the stock price on May 15 th',
        text: req.body.message
      };
      
      // Send the email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      }); 
})

app.listen(5000, function() {
    console.log("Server started on port 5000");
  });