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

// a middleware that checks if a given Customer id exists for end points that has Customer id params
router.use('/:id', verifyToken)

router.route('/:id')
    .put(updateCustomer) // update a Customer
    .delete(deleteCustomer) // delete a Customer
    .get(getCustomerById)  // get a Customer

module.exports = router