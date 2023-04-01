const {Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const {customerJoiSchema} = require('../utils/joiSchema')
const {paginate,paginationError} = require('../utils')
const {BadRequestError} = require('../errors')
const {createUserAuth,userLoginAuth} = require('../middlewares/auth')
 


/*********UNPROTECTED ROUTES ********/

// create a new Customer
const createCustomer = async (req, res) => {
    const validation = customerJoiSchema(req.body)
    const {error, value} = await validation
    if (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.details[0].message);
        return;
    }
    try {
        const user = await Customer.create({ ...value })
        // createUserAuth({ name: user.name, userId: user._id }, res) //generate user auth token and sent to cookie
        res.status(StatusCodes.OK).json({ message: 'customer created successfully', data: user })
    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }

}

//get all available Customers
const getAllCustomers = async( req, res, next ) => {
    try{
        const allCustomers = await Customer.find().sort('name')
      //paginated results will be returned to the user
      const error = paginationError(allCustomers, req)
      if (error) {
          res.status(error.status).json({ message: error.message })
          return;
      }
      const data = paginate(allCustomers, req, 'customers') //default page number and limit is 1 and 3 respectively
      res.status(StatusCodes.OK).json(data)
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}


/*********PROTECTED ROUTES ********/

// get a customer by Id
const getCustomerById = async( req, res, next ) => {
    try{
        const user = await Customer.findById( req.params.id)
        res.status(StatusCodes.OK).json({data: user})  
    }
    catch(err){
        throw new BadRequestError(err.message)
    }
}

const deleteCustomer = async( req, res, next ) => {
    try{
       await Customer.findByIdAndDelete( req.params.id)
          
        res.status(StatusCodes.OK).json({message: 'Customer deleted successfully'})
        
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}

const updateCustomer = async( req, res, next ) => {
    try{
        const user = await Customer.findByIdAndUpdate(req.params.id, req.body,{ returnDocument :'after'})
        res.status(StatusCodes.OK).json({message: 'customer updated successfully', data: user})
        
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    }
}


module.exports = {getCustomerById, getAllCustomers, createCustomer,deleteCustomer, updateCustomer}

