const mongoose = require('mongoose');
const {Schema, model} = mongoose

const genreSchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        lowercase: true,
        required: [true, 'please provide a name for this genre with characters not less than 2']
    }
})

module.exports = model('Genre', genreSchema)