const express = require('express')
const {Genre, Movie} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {getGenreById, getAllGenres, createGenre,deleteGenre, updateGenre} =require('../controllers')

const router = express.Router()

router.route('/')
    .get(getAllGenres)
    .post(createGenre)

// a middleware that checks if a given genre id exists
router.use('/:id', async (req, res, next) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Genre not found' })
        return
    }
    next()
})
router.route('/:id')
    .put(updateGenre)
    .delete(deleteGenre)
    .get(getGenreById)



module.exports = router

