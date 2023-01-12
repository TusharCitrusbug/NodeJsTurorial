const express = require('express');
const app = express();
const { fork } = require('child_process')
// const child_process = require('child_process');
// child_process.exec('google-chrome https://www.youtube.com/watch?v=9kK3VESSk84')
// set view engine
// app.set('view engine', 'ejs');


app.get("/isprime", (req, res) => {
    const childProcess = fork('./isprime.js');
    childProcess.send({ "number": parseInt(req.query.number) })
    childProcess.on("message", message => res.send(message))
})
app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});