const express = require('express')
const { Rental} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {getAllRentals, createRental} =require('../controllers');
const {verifyToken} = require('../middlewares/auth')


const router = express.Router()

// get all Rentals sorted by name
router.get('/',getAllRentals)

// a middleware that checks if a given Customer id exists for end points that has Customer id params
router.use('/:id', verifyToken)

// endpoint for creating new Rentals
router.post('/:id/:movieId',createRental)



module.exports = router