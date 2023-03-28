const {Genre} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {genreJoiSchema} = require('../utils/joiSchema')
const {paginate,paginationError} = require('../utils')
const    {BadRequestError} = require('../errors')
 

// get a genre by Id
const getGenreById = async( req, res, next ) => {
    try{
        const genre = await Genre.findById( req.params.id)
        res.status(StatusCodes.OK).json({data: genre})  
    }
    catch(err){
        throw new BadRequestError(err.message)
        // res.status(BadRequestError).json({message: err.message})
    }
}

//get all available genres
const getAllGenres = async( req, res, next ) => {
    console.log( 'getGenreById')

    try{
        const allGenres = await Genre.find().sort('name')
      //paginated results will be returned to the user
      const error = paginationError(allGenres, req)
      if (error) {
          res.status(error.status).json({ message: error.message })
          return;
      }
      const data = paginate(allGenres, req, 'genres') //default page number and limit is 1 and 3 respectively
      res.status(StatusCodes.OK).json(data)
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}
// create a new genre
const createGenre = async (req, res) => {
    const validation = genreJoiSchema(req.body)
    if (validation.error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.details[0].message);
        return;
    }
    try{
        const genre = await Genre.create({...req.body})
        res.status(StatusCodes.OK).json({message: 'genre created successfully',data: genre})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }

}

const deleteGenre = async( req, res, next ) => {
    try{
       await Genre.findByIdAndDelete( req.params.id)
          
        res.status(StatusCodes.OK).json({message: 'Genre deleted successfully'})
        
    }
    catch(err){
        res.status(BadRequestError).json({message: err.message})
    }
}

const updateGenre = async( req, res, next ) => {
    try{
        const genre = await Genre.findByIdAndUpdate({name: req.body.name})
        res.status(StatusCodes.OK).json({message: 'Genre updated successfully', data:genre})
        throw new BadRequestError(err.message)
        
    }
    catch(err){

        res.status().json({message: err.message})
    }
}


module.exports = {getGenreById, getAllGenres, createGenre,deleteGenre, updateGenre}
// Create endpoint to Create a new Genre  POST /
// Create endpoint to Update a Genre by id PUT /:id
// Create endpoint to Delete a Genre by id DELETE /:id 
// Create endpoint to Get a Genre by Id GET /:id 
