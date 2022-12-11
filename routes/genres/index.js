const express = require('express')
const Joi = require('joi')
const { genres, movies, users } = require('../../database')
const {getById, getIndexById} = require('../../functions')
const genresRouter = express.Router()




genresRouter.get('/', (req, res) => {
    res.status(200).send(genres)
})

genresRouter.get('/:genreId', (req, res) => {
    const genre = getById(genres, req.params.genreId)
    if (!genre) return res.status(404).send('genre not found')
    res.status(200).json({ genre })
})

genresRouter.post('/', (req, res) => {
    if (req.body.adminId !== "1") return res.status(401).send('unauthorized user') //only admin can add more genres
    validateSchema(req.body)
    const result = validateSchema(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //adding the new genre to the genres list in database
    delete req.body.adminId
    const newGenre = req.body
    newGenre.id = genres.length + 1
    newGenre.availableMovies = 0 // this will update if new movie with the genre is available/added
    genres.push(newGenre)
    res.status(200).json({ newGenre })
})

genresRouter.put('/:genreId/:adminId', (req, res) => {
    if (req.params.adminId !== 1) return res.status(401).send('unauthorized user')
    const genre = getById(genres, req.params.genreId) // finding the genre with the id
    const genreIndex = getIndexById(genres, req.params.genreId) //finding the index of the genre with the id
    if (!genre) return res.status(404).send('genre not found')

    validateSchema(req.body)
    const result = validateSchema(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    delete req.body.adminId //delete the adminId from the request body
    const updatedGenre = req.body
    updatedGenre.id = genre.id
    genres.slice(genreIndex, 1, updatedGenre)
    res.status(200).json({ updatedGenre })

})

genresRouter.patch('/:genreId/:adminId', (req, res) => {
    if (req.params.adminId !== "1") return res.status(400).send('unauthorized user')
    const genre = getById(genres, req.params.genreId)
    if (!genre) return res.status(404).send('genre not found')
    const schema = Joi.object({
        name: Joi.string().min(3).max(16),
        description: Joi.string().min(3).max(200),
        availableMovies: Joi.number()
    })
    const result = schema.validate(req.body)
    if (!req.body) return res.status(400).send('update not found') //incase client sent in empty request
    for (key in req.body) {
        if(key=== 'id') continue //to ignore id if present in body
        genre[key] = req.body[key]
    }

})


genresRouter.delete('/:genreId/:adminId', (req, res) => {
    const genre = getById(genres, req.params.id) // finding the genre with the id
    const genreIndex = getIndexById(genres, req.params.id) //finding the index of the genre with the id
    if (!genre) return res.status(404).send('genre not found')

    genres.slice(genreIndex, 1)
    res.status(200).end('delete successful')
})

function validateSchema(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(16).required(),
        description: Joi.string().min(3).max(200).required(),
        availableMovies: Joi.number().required()
    })
    return schema.validate(req)
}

module.exports = genresRouter

