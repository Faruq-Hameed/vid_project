const express = require('express')
const Joi = require('joi')

const { genres,} = require('../../database')
const { getById, getIndexById } = require('../../functions/')
const { validatedGenre, optionalValidatedGenre,validationError,genreError,doesItemExist } = require('../../errors')


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
    if (doesItemExist(genres, validation.value.name, res)) { return }// if new genre name already exists
    
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

    //checking if the new name is different from the previous and is not the same for another genre
    if ((genre.name.toUpperCase() !== validation.value.name.toUpperCase())
        && doesItemExist(genres, validation.value.name, res)) { return }
    
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

    //if name is present & is different from the previous & is the same for another genre
    if ((name && genre.name.toUpperCase() !== validation.value.name.toUpperCase())
        && doesItemExist(genres, validation.value.name, res)) { return }

    if(name) genre.name = name
    if(description) genre.description = description

    res.status(200).json({ genre })
})


router.delete('/:genreId', (req, res) => {
    const genreIndex = getIndexById(genres, req.params.genreId) //finding the index of the genre with the id

    if (genreError(genreIndex, res)) {return}

    genres.splice(genreIndex, 1)
    res.status(200).end('delete successful')
})



module.exports = router

