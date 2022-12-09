const http = require('node:http');
const colors = require('colors')
const port = 8000;
const hostname = 'localhost';

const expoter = require('./expoter')
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

console.log(expoter);
console.log("sfdksjdksd".rainbow);
console.log(expoter.addition(10,20))
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
