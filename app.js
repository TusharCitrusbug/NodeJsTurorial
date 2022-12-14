const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/orders')
const config = require('./config')
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

const ENABLE_SWAGGER = config.ENABLE_SWAGGER


if (ENABLE_SWAGGER) {
    const swaggerUi = require("swagger-ui-express");
    const swagerJSDoc = require("swagger-jsdoc");
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Product Api',
                version: '1.0.0',
            },
            servers: [{
                url: 'http://localhost:8000/'
            }]
        },
        apis: ['./routes/*.js'],

    };
    const openapiSpecification = swagerJSDoc(options);
    app.use(
        '/',
        swaggerUi.serve,
        swaggerUi.setup(openapiSpecification)
    );
}

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