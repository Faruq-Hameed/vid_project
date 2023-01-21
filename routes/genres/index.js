const express = require('express')
const Joi = require('joi')
const { genres, movies, users } = require('../../database')
const {getById, getIndexById,getObjectByAny, validationError, validatedGenre, optionalValidatedGenre } = require('../../functions/')

const router = express.Router()

router.get('/', (req, res) => {
    if(genres.length === 0) { 
        return res.status(404).send('no genres available');
    }
    res.status(200).send(genres)
})

router.get('/:genreId', (req, res) => {
    const genre = getById(genres, req.params.genreId)
    if (!genre) return res.status(404).send('genre not found')
    res.status(200).json({ genre })
})

router.post('/', (req, res) => {
    const validation = validatedGenre(req.body)
    if (validationError(validation, res)) { return } //returning validation errors if any
     
    const doesGenreExist = getObjectByAny(genres, validation.value.name,)
    if (doesGenreExist) { return res.status(400).send(`genres with name '${validation.value.name}' already exists`) }
    console.log(doesGenreExist)
    //adding the new genre to the genres list in database
    const newGenre = validation.value
    newGenre.id = genres.length + 1
    newGenre.availableMovies = 0 
    genres.push(newGenre)
    res.status(200).json({ newGenre })
})


router.put('/:genreId/', (req, res) => {
    const genre = getById(genres, req.params.genreId) // finding the genre with the id
    if (!genre) return res.status(404).send('genre not found')

    const genreIndex = getIndexById(genres, req.params.genreId) //finding the index of the genre with the id
    
    const validation = validatedGenre(req.body)
    if (validationError(validation, res)) { return };

    const doesGenreExist = getObjectByAny(genres, validation.value.name,)
    if (doesGenreExist) {
        res.status(403).send(`genres with name '${validation.value.name}' already exists`)
        return
    }

    const updatedGenre = validation.value
    updatedGenre.id = genre.id
    updatedGenre.availableMovies = genre.availableMovies

    genres.slice(genreIndex, 1, updatedGenre)
    res.status(200).json({ updatedGenre })

})


router.patch('/:genreId/', (req, res) => {
    const genre = getById(genres, req.params.genreId)
    if (!genre) return res.status(404).send('genre not found')
        
    const validation = optionalValidatedGenre(req.body)
    if (validationError(validation, res)) { return }

    const {name, description} = optionalValidatedGenre.value
    

    if (name) {//checking if the new name provided already exists
        for (element of genres) {
            if (element !== genre && element.name === optionalValidatedGenre.name) {//only check if the element (genre object) is not the current genre
                return res.status(409).send('username already exists')
            }
            genre.name = name
        }
    }

    genre.description = description

    res.status(200).json({ genre })
})


router.delete('/:genreId', (req, res) => {

    const genreIndex = getIndexById(genres, req.params.genreId) //finding the index of the genre with the id
    if (!genreIndex) return res.status(404).send('genre not found')

    genres.splice(genreIndex, 1)
    res.status(200).end('delete successful')
})



module.exports = router

