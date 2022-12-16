const express = require('express')
const http = require('http')
const port = 6969;
const server = http.createServer(express)
const WebSocket = require('ws')
const web_socket_server = new WebSocket.Server({ server });

web_socket_server.on('connection', (ws) => {
    ws.on("message", (data) => {
        web_socket_server.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
    })
})


server.listen(port)