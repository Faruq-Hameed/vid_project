const express = require('express')
const { Rental} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {getRentalById, getAllRentals, createRental,deleteRental, updateRental} =require('../controllers');

const router = express.Router()

// get all Rentals sorted by name
router.get('/',getAllRentals)

// endpoint for creating new Rentals
router.post('/',createRental)

// a middleware that checks if a given Rental id exists for end points that has Rental id params
router.use('/:id', async (req, res, next) => {
    const Rental = await Rental.findById(req.params.id)
    if (!Rental) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Rental not found' })
        return
    }
    next()
})

router.route('/:id')
    .put(updateRental) // update a Rental
    .delete(deleteRental) // delete a Rental
    .get(getRentalById)  // get a Rental
module.exports = router