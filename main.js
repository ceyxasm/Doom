const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const { PassThrough } = require("stream");
const { Console } = require("console");


const port = process.env.PORT || 3000;  //PORT

const app = express();

// View Engine Setup
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

// Static folder
app.use('/public',express.static(path.join(__dirname,'public')));

// Body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// EndPoints
app.get('/',(req,res)=>{
    fs.readFile("./templates/index.html", function (error, pgResp) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
        res.end();
    });
}); 

app.post('/send',(req,res)=>{
    console.log(req.body);
    fs.readFile("./templates/success.html", function (error, pgResp) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(pgResp);
        res.end();
    });
});
 


//START THE SERVER
app.listen(port, () => {
    console.log(`Listening on port:${port}`);
})
