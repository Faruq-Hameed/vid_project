const {Genre, Movie, Rental, Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {movieJoiSchema} = require('../utils/joiSchema')
const {paginate,paginationError} = require('../utils')
const    {BadRequestError} = require('../errors')

// get a Movie by Id
const getMovieById = async( req, res, next ) => {
    try{
        const movie = await Movie.findById( req.params.id)
        .populate('genre')
        .exec()
        res.status(StatusCodes.OK).json({data: movie})  
    }
    catch(err){
        throw new BadRequestError(err.message)
        // res.status(BadRequestError).json({message: err.message})
    }
}

//get all available Movies
const getAllMovies = async( req, res, next ) => {
    
    try{
        const allMovies = await Movie.find().populate('genre').sort('title')
      //paginated results will be returned to the user
      const error = paginationError(allMovies, req)
      if (error) {
          res.status(error.status).json({ message: error.message })
          return;
      }
      const data = paginate(allMovies, req, 'movies') //default page number and limit is 1 and 3 respectively
      res.status(StatusCodes.OK).json(data)
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}
// create a new Movie
const createMovie = async (req, res) => {
    const validation = movieJoiSchema(req.body)
    const {error, value} = validation
    if (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.details[0].message);
        return;
    }
    //checking if the genre id provided is valid
    const genre = await Genre.findById(req.params.genreId)
    if (!genre) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'genre not found' })
        return
    }

    try{
         //check if the Movie name is not already in the database
         const movieAlreadyExist = await Movie.findOne({title: value.title})
         if(movieAlreadyExist) {
             return res
             .status(StatusCodes.CONFLICT).json({message: 'Movie already exists'})
         }
 
        const newMovie = new Movie(value)
        newMovie.genre = req.params.genreId
        await newMovie.save()
        res.status(StatusCodes.CREATED).json({message: 'Movie created successfully',data: newMovie})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}

//delete 
const deleteMovie = async( req, res, next ) => {
    try{
       await Movie.findByIdAndDelete( req.params.id)
        res.status(StatusCodes.OK).json({message: 'Movie deleted successfully'})
        
    }
    catch(err){
        res.status(BadRequestError).json({message: err.message})
    }
}

const updateMovie = async( req, res, next ) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id,req.body, { returnDocument :'after'})
        res.status(StatusCodes.OK).json({message: 'movie updated successfully', data:movie})        
    }
    catch(err){

        res.status(StatusCodes.BAD_REQUEST).json({message: err.message})
    }
}


module.exports = {getMovieById, getAllMovies, createMovie,deleteMovie, updateMovie}

