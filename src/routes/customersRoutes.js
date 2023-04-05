const express = require('express')
const { Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middlewares/auth')
const {getCustomerById, getAllCustomers, createCustomer,deleteCustomer, updateCustomer} =require('../controllers');

const router = express.Router()

// get all Customers sorted by name
router.get('/',getAllCustomers)

// endpoint for creating new Customers
router.post('/',createCustomer)

/**authentication and user verification middleware. If authentication or verification failed
then request to any of the endpoints below wont be accepted */
router.use('/:userId', verifyToken)

router.route('/:userId')
    .put(updateCustomer) // update a Customer
    .delete(deleteCustomer) // delete a Customer
    .get(getCustomerById)  // get a Customer

module.exports = router