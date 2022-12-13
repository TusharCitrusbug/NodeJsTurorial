const express = require('express')
const http = require('node:http');
const port = 8000
const hostname = 'localhost';

// apps
const get_app = require('./app')

const server = http.createServer(get_app);
// connection of db directly in server
const db = require('./db_connector');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


