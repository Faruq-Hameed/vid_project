const express = require('express')
const { Rental} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {getAllRentals, createRental} =require('../controllers');
const {verifyToken} = require('../middlewares/auth')


const router = express.Router()

// get all Rentals sorted by name
router.get('/',getAllRentals)

// authentication and user verification middleware.
router.use('/:userId', verifyToken)

// endpoint for creating new Rentals
router.post('/:userId/:movieId',createRental)



module.exports = router