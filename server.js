require('dotenv').config();
const http = require('node:http');
const port = Number(process.env.PROJECT_PORT)
const hostname = process.env.PROJECT_HOST;

// apps
const get_app = require('./app')

const server = http.createServer(get_app);
// connection of db directly in server
const db = require('./db_connector');

db.Promise = global.Promise;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


