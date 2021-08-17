const request = require('request');

const geoCode = (address, callback) => {
    const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2JyYW8iLCJhIjoiY2tydDdnOHR5MGJpczJ2cXVkcnZjbHhuaiJ9.Bi1EbLYhkHM1aXa-kRzmvg`
    request({ url: URL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. retry with another location.", undefined)
        } else {
            const { center, place_name } = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name,
            })
        }
    })
}

module.exports = geoCode


