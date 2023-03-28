const express = require('express')
const { Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {getCustomerById, getAllCustomers, createCustomer,deleteCustomer, updateCustomer} =require('../controllers');

const router = express.Router()

// get all Customers sorted by name
router.get('/',getAllCustomers)

// endpoint for creating new Customers
router.post('/',createCustomer)

// a middleware that checks if a given Customer id exists for end points that has Customer id params
router.use('/:id', async (req, res, next) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'customer not found' })
        return
    }
    next()
})

router.route('/:id')
    .put(updateCustomer) // update a Customer
    .delete(deleteCustomer) // delete a Customer
    .get(getCustomerById)  // get a Customer
module.exports = router