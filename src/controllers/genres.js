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
    const {error, value} = validation
    if (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.details[0].message);
        return;
    }
    try{
        //check if the genre name is not already in the database
        const genreAlreadyExist = await Genre.findOne({name: value.name})
        if(genreAlreadyExist) {
            return res
            .status(StatusCodes.CONFLICT).json({message: 'genre already exists'})
        }

        const genre = await Genre.create({...req.body})
        res.status(StatusCodes.OK).json({message: 'genre created successfully',data: genre})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }

}

//delete genre 
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
        const genre = await Genre.findByIdAndUpdate({name: req.body.name}, { returnDocument :'after'})
        res.status(StatusCodes.OK).json({message: 'Genre updated successfully', data:genre})
        throw new BadRequestError(err.message)
        
    }
    catch(err){

        res.status(StatusCodes.BAD_REQUEST).json({message: err.message})
    }
}


module.exports = {getGenreById, getAllGenres, createGenre,deleteGenre, updateGenre}
