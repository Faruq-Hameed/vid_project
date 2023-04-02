const mongoose = require('mongoose');
const {Schema, model} = mongoose

const rentalSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'customer id required']
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'Movie id required']
    },
    dateOut: {
        type: Date,
        default: Date.now()
      },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        required: [true, 'rental fee is required']
    } 
})

module.exports = model('Rental', rentalSchema)
