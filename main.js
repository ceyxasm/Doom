const http = require("http");
const fs = require('fs');
const { PassThrough } = require("stream");
const { Console } = require("console");

const server = http.createServer((req, res) => {
    if (req.url === "/login/compose") {
        if (req.methode === "GET") {
            fs.readFile("./templates/form.html", function (error, pgResp) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgResp);
                res.end();
            });
        }
        else if (req.methode === "POST") {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                console.log(body);
                res.end('ok');
            });
        }
    }
});

server.on('connection', (socket) => {
    console.log("seeing");
})

server.listen(3000);

console.log("hello world");