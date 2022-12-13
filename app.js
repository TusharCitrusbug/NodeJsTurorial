const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();

const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/orders')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// setting up cors using middlewere.
app.use((req, resp, next) => {

    resp.header('Access-Control-Allow-Origin', '*')
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Authorization,Content-Length')

    if (req.method === 'OPTIONS') {
        resp.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return resp.status(200).json({})
    }
    next();
});



// swagger adding into api

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use((req, resp, next) => {
    const error = new Error('Not Found!')
    error.status = 404;
    next(error);
})

app.use((error, req, resp, next) => {
    resp.status(error.status || 500);
    resp.json({
        error: {
            message: error.message
        }
    })
})



module.exports = app;