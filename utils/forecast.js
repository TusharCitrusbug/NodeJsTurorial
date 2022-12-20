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
            callback(undefined, `In ${body.location.name} city of ${body.location.country} country  It is currently ${body.current.temperature} degress out. WHich is observed at  ${body.current.observation_time}`)
        }
    })
}

module.exports = forecast