const mongoose = require('mongoose')
const { Schema, model } = mongoose

const customerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide a customer name']
    },
    isGold: {
        type: Boolean,
        default: true,
        required: [true, 'is customer gold?']

    },
    phone: {
        type: {
            type: Number,
            required: [true, 'customer phone number required']
        }
    },
},
    { timestamps: true }
)

module.exports = model('Customer', customerSchema)
