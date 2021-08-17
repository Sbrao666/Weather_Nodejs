const request = require('request');

const forecast = (lat, long, calllback) => {
    const url = `http://api.weatherstack.com/current?access_key=af3d5455ebf52b64b918b855aeac41ea&query=${lat},${long}`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            calllback("Unbale to connect forcast server. Please check network.", undefined,)
        } else if (body.error) {
            calllback(body.error.info, undefined,)
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current
            calllback(undefined, `${weather_descriptions}. It is currently ${temperature} degrees out but feels like ${feelslike} degrees.`)
        }
    })
}


module.exports = forecast