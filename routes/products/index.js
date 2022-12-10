const express = require('express')
const {genres, movies, users} = require('../../database')

const moviesRouter = express.Router()




moviesRouter.get('/', (req, res) => {
    res.status(200).send(movies)
})

moviesRouter.get('/:id', (req, res) => {
const movie = getById(movies, req.params.id)
})

moviesRouter.post('/', (req, res) => {

})

function getById(array, id) {
    const item = array.find(obj => obj.id === parseInt(id))
    return item
}

module.exports = moviesRouter