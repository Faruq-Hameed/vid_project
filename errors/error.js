const {getObjectByAny} = require('../functions')


function validationError(validatedSchema, res){ //handle Joi validation errors if present
    if (validatedSchema.error) {
        res.status(400).send(validatedSchema.error.details[0].message);
        return true;
    }
}


function genreError(genre, res){ //handling unknown genre error if present
    if (!genre || genre < 0) {
        res.status(404).send('genre not found')
        return true;
    }
}


function doesItemExist(genres, value, res) {
    const doesGenreExist = getObjectByAny(genres, 'name', value) //if genre with the new name already exists
    if (doesGenreExist) {
        res.status(400).send(`genres with name '${value}' already exists`)
        return true
    }
}
module.exports = {validationError, genreError,doesItemExist}