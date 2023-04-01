const {Genre, Movie, Rental, Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {movieJoiSchema} = require('../utils/joiSchema')
const {paginate,paginationError} = require('../utils')
const    {BadRequestError} = require('../errors')

// get a Movie by Id
const getRentalById = async( req, res, next ) => {
    try{
        const Rental = await Rental.findById( req.params.id)
        .populate('genre')
        .exec()
        res.status(StatusCodes.OK).json({data: Rental})  
    }
    catch(err){
        throw new BadRequestError(err.message)
        // res.status(BadRequestError).json({message: err.message})
    }
}

//get all available Rentals
const getAllRentals = async( req, res, next ) => {
    
    try{
        const allRentals = await Rental.find().sort('title')
      //paginated results will be returned to the user
      const error = paginationError(allRentals, req)
      if (error) {
          res.status(error.status).json({ message: error.message })
          return;
      }
      const data = paginate(allRentals, req, 'Rentals') //default page number and limit is 1 and 3 respectively
      res.status(StatusCodes.OK).json(data)
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}
// create a new Rental
const createRental = async (req, res) => {
    const validation = RentalJoiSchema(req.body)
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
        const newRental = new Rental(value)
        newRental.genre = req.params.genreId
        await newRental.save()
        res.status(StatusCodes.CREATED).json({message: 'Rental created successfully',data: newRental})
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}


const deleteRental = async( req, res, next ) => {
    try{
       await Rental.findByIdAndDelete( req.params.id)
        res.status(StatusCodes.OK).json({message: 'Rental deleted successfully'})
        
    }
    catch(err){
        res.status(BadRequestError).json({message: err.message})
    }
}

const updateRental = async( req, res, next ) => {
    try{
        const Rental = await Rental.findByIdAndUpdate(req.params.id,req.body)
        res.status(StatusCodes.OK).json({message: 'Rental updated successfully', data:Rental})        
    }
    catch(err){

        res.status(StatusCodes.BAD_REQUEST).json({message: err.message})
    }
}


module.exports = {getRentalById, getAllRentals, createRental,deleteRental, updateRental}

