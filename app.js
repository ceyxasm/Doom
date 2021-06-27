const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const { PassThrough } = require("stream");
const { Console } = require("console");
const { exit } = require('process');

require('dotenv').config()

const port = process.env.PORT || 3000;  //PORT

const app = express();

// View Engine Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// EndPoints
app.get('/',(req,res)=>{
    return res.redirect('/login');
}); 

app.get('/login',(req,res)=>{
    fs.readFile("./templates/login.html", function (error, pgResp) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
        res.end();
    });
}); 
app.post('/login',(req,res)=>{
    let user = req.body.email;
    let pass = req.body.password;

    if(user=='mark121wood@gmail.com' && pass=='doomdoom'){
        return res.redirect('/email');
    }
    else{
        return res.redirect('/login');
    }
    
});

app.get('/signup',(req,res)=>{
    fs.readFile("./templates/signup.html", function (error, pgResp) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
        res.end();
    });
}); 

app.post('/signup',(req,res)=>{
    
    return res.redirect('/login');
});

app.get('/email',(req,res)=>{
    fs.readFile("./templates/index.html", function (error, pgResp) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
        res.end();
    });
});

app.post('/send', (req, res) => {
    // Using NodeMailer 
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    let mailOptions = {
        from: process.env.USER_MAIL,
        to: `${req.body.to}`,
        subject: `${req.body.subject}`,
        html: `${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            fs.readFile("./templates/success.html", function (error, pgResp) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgResp);
                res.end();
            });
        }
    });
    

});




//START THE SERVER
app.listen(port, () => {
    console.log(`Listening on port:${port}`);
})
