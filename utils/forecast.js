require('dotenv').config();
const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${latitude},${longitude}`
    console.log(url, process.env.API_KEY);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast