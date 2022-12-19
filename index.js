// console.log("starting");

// setTimeout(() => {
//     console.log("2 sec timer");
// }, 2000);

// setTimeout(() => {
//     console.log("0 sec timer");

// }, 0);
// console.log("stopping");

// require('dotenv').config();

// const request = require('postman-request');

// const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=23.022505,72.571365&units=m`


// request({ url: url }, (error,response) => {
//     const  data = JSON.parse(response.body)
//     console.log(data.current);
// })

// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

// geocode('Boston', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

// forecast(44.1545, -75.7088, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })




// objects destructuring

// const user = {
//     name: "tushar",
//     age: '33'
// }


// console.log(user);


// const product = {
//     label: "samsung",
//     price: 3,
//     stock: 7,
//     salePrice: 888
// }

// const { label: productLable, price, stock, salePrice } = product

// console.log(productLable);

// const transaction = (type, { label, price, stock }) => {
//     console.log(`${type}, ${label}, ${price}, ${stock}`);
// }

// transaction('myType',product)

const https = require('https')

const url = `https://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=23.022505,72.571365&units=m`

const request = https.request(url, (response) => {
    let data = ''
    response.on('data', (chunk) => {
        data = chunk.toString()
    })

    response.on('end', () => {
        console.log(data);
    })
})
request.end();