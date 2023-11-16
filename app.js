const express = require('express')
const morgan = require('morgan');
require('dotenv').config({path: './.env'})
const cookieParser = require("cookie-parser");
const {genreRouter, moviesRouter, customerRouter, rentalRouter} = require('./src/routes')
const startServer = require('./src/database/connection')
const app = express();

const port = process.env.PORT || 3000
startServer()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());




app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :remote-user :date"))

app.use('/api/genres', genreRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/customers', customerRouter)
app.use('/api/rentals', rentalRouter)



app.use('/', (req, res) => {
    res.status(200).send('Welcome to faruq vid app')
})

// handling all unknown url requests
app.use('*', (req, res) => {
    res.status(404).send(`You typed an invalid url`)
})

app.listen(port, () => {
    console.info('listening on port ', port)
})