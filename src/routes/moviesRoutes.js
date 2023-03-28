const express = require('express')
const { Movie} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {getMovieById, getAllMovies, createMovie,deleteMovie, updateMovie} =require('../controllers');

const router = express.Router()

// get all movies sorted by title
router.get('/',getAllMovies)

// endpoint for creating new movies
router.post('/:genreId',createMovie)

// a middleware that checks if a given Movie id exists for end points that has movie id params
router.use('/:id', async (req, res, next) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Movie not found' })
        return
    }
    next()
})

router.route('/:id')
    .put(updateMovie) // update a movie
    .delete(deleteMovie) // delete a movie
    .get(getMovieById)  // get a movie
module.exports = router