const express = require("express");
const wbm = require("wbm");
const  nodemailer = require('nodemailer');
const app=express();


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
        console.log(req.body.number,req.body.message);
    wbm.start().then(async () => {
        const phones = [req.body.number];
        const message = req.body.message;
        await wbm.send(phones, message);
        await wbm.end();
    }).catch(err => console.log(err));
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