const mongoose = require('mongoose')
const { Schema, model } = mongoose

const movieSchema = new Schema({
    title: {
        type: String,
        maxLength: 255,
        required: [true, 'movie title should be provided and not more than 255 characters']
    },
    genre: {
        type: String,
        ref: 'Genre',
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true }
)

module.exports = model('Movie', movieSchema)
