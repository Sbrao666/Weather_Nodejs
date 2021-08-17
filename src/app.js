const path = require('path')
const express = require("express")
const hbs = require("hbs");
const publicDirectoryPath = path.join(__dirname, "../public")
const viewDirectoryPath = path.join(__dirname, "../templates/views")
const partialDirectoryPath = path.join(__dirname, "../templates/partials")
const forecast = require("../Utility/forecast")
const geoCode = require("../Utility/geoCode")

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Sanket Bhalerao"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    return res.send({
                        location: location,
                        forcast: data
                    })
                }
            })
        }
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "We are here to help you"
    })
})

app.get('/about', (req, res) => {
    res.render('help', {
        title: "about Page",
        message: "We are here to help you",
        name: "Sanket Bhalerao"

    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: "Article not found\nerror 404"
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: "404 Page Not Found"
    })
})

app.listen(port, () => {
    console.log("The server is up and running on the port " + port)
})

