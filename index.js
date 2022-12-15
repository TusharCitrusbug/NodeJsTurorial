// const data = require('./data')
// const http = require('node:http');
// const port = 8000;
// const hostname = 'localhost';

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.write(JSON.stringify(data.data));
//     res.end()
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


const express = require('express')

const environ = require('./environ')

const app = express();

const cookie_parser = require('cookie-parser');
const statis_path = environ.path.static_path
// app.use(express.static(environ.path.static_path))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

// custom middle ware in express
const customMiddleWear = (req, resp, next) => {
    next();
    // if (req.body.fname && req.body.fname) {
    //     next();  
    // }else{
    //     resp.render('404')
    // }
}
app.use(customMiddleWear)
app.use(cookie_parser())

// app.get('', (req, resp) => {
//     resp.sendFile(`${statis_path}/index.html`)
// })


// render direct with ejs

app.get('', (req, resp) => {
    resp.render('index')
})

app.post('/home', (req, resp) => {
    console.log(req.body);
    resp.redirect('/')
})
app.get('/about', (req, resp) => {
    let data = {
        tushar: "lsjkdlskd",
        rahul: "kdfjkdfjdkf",
        ratan: "xmcnxmcnxmc",
        manan: "smdskjdksjdskdjsd",
        subjects: ["skdd", 's', 12, 5, 9, "kjdskjsdk"]
    }
    resp.render('users/about', { data })
})

// render direct html file
// app.get('*', (req, resp) => {
//     resp.sendFile(`${statis_path}/404.html`)
// })

// Cookies in node/express js
app.get('/set-cookies', (req, resp) => {
    resp.cookie('foo','bar')
    resp.send("cookie is set");

})
app.get('/get-cookies', (req, resp) => {
    console.log(req.cookies);
    resp.send(req.cookies);
})
app.get('/remove-cookies', (req, resp) => {
    resp.clearCookie("foo")
    resp.send(req.cookies);
})


app.get('*', (req, resp) => {
    resp.render('404')
})
app.listen(8000);