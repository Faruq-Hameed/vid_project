const {Movie, Rental} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {RentalJoiSchema} = require('../utils/joiSchema')
const {paginate,paginationError} = require('../utils')


//get all available Rentals
const getAllRentals = async( req, res, next ) => {  
    try{
        const allRentals = await Rental.find().sort('dateOut')
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
    // checking if the movie is available
    try{
        const isMovieAvailable = await Movie.findById(req.params.movieId)
        if(!isMovieAvailable || isMovieAvailable.numberInStock === 0) {
            return res
                .status(StatusCodes.OK)
                .json({ message: 'Movie not available at this time' })
        }

        //create the new rental
       const rental = await Rental.create({
            customer: req.payload.userId,
            movie: req.params.movieId,
           rentalFee: value.rentalFee
       })

        //update and save the movie stock number
        isMovieAvailable.numberInStock -= 1
        isMovieAvailable.dailyRentalRate +=1
        await isMovieAvailable.save()

        res.status(StatusCodes.CREATED).json({ message: 'new movie rental request successfully created', data: rental })

    }
    catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message })
    }
}


module.exports = { getAllRentals, createRental }

