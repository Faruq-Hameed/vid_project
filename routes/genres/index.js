const express = require('express')
const Joi = require('joi')

const { genres,} = require('../../database')
const { getById, getIndexById, getObjectByAny } = require('../../functions/')
const { validatedGenre, optionalValidatedGenre } = require('../../functions/schema')
const { validationError, genreError, doesItemExist } = require('../../functions/error')

const router = express.Router()


router.get('/', (req, res) => {
    if(genres.length === 0) { 
        return res.status(404).send('no genres available');
    }
    res.status(200).send(genres)
})


router.get('/:genreId', (req, res) => {
    const genre = getById(genres, req.params.genreId)
    if (genreError(genre, res)) {return} // if error present, the process terminates here
    
    res.status(200).json({ genre })
})


router.post('/', (req, res) => {
    const validation = validatedGenre(req.body)
    if (validationError(validation, res)) { return } //returning validation errors if any

    const doesGenreExist = getObjectByAny(genres,'name',validation.value.name)
    if (doesGenreExist) {
        res.status(400).send(`genres with name '${validation.value.name}' already exists`)
        return
    }
    //adding the new genre to the genres list in database
    const newGenre = validation.value
    newGenre.id = genres.length + 1
    genres.push(newGenre)
    res.status(200).json({ newGenre })
})


router.put('/:genreId/', (req, res) => {
    const genre = getById(genres, req.params.genreId)
    if (genreError(genre, res)) {return} // if error present, the process terminates here

    const genreIndex = getIndexById(genres, req.params.genreId) //finding the index of the genre with the id
    
    const validation = validatedGenre(req.body)
    if (validationError(validation, res)) { return }; 

    const {name} = validation.value
    if (doesItemExist(genres, genre,name, 'name', res)) {return} //checking if we already have a genre with the new name

    const updatedGenre = validation.value
    updatedGenre.id = genre.id

    genres.splice(genreIndex, 1, updatedGenre)
    res.status(200).json({updatedGenre} )
})


router.patch('/:genreId/', (req, res) => {
    const genre = getById(genres, req.params.genreId)
    if (genreError(genre, res)) {return}
        
    const validation = optionalValidatedGenre(req.body)
    if (validationError(validation, res)) { return }

    const {name, description} = validation.value
    if (doesItemExist(genres, genre,name, 'name', res)) {return} //checking if we already have a genre with the new name

    genre.name = name
    genre.description = description

    res.status(200).json({ genre })
})


router.delete('/:genreId', (req, res) => {
    const genreIndex = getIndexById(genres, req.params.genreId) //finding the index of the genre with the id

    if (genreError(genreIndex, res)) {return}

    genres.splice(genreIndex, 1)
    res.status(200).end('delete successful')
})



module.exports = router

