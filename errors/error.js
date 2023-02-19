const {getObjectByAny} = require('../functions')
const {paginationSchema} = require('./schema')


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

//errors related to pagination
function paginationError(array, req,res){
    const validation = paginationSchema(req.query)

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message); //if the validation is not successful
        return true;
    }


    if (!array || array.length === 0) {
        res.status(404).send('no item is available'); //return error if the database provide is undefined or empty
        return true;
    }

    const { page, limit } = validation.value  //using the validated input from the schema

    // incase the client is requesting for an exceeded limit or page number
    if(limit > array.length){
        res.status(404).send(`you have exceeded the maximum limit of ${Math.ceil(array.length)}`)
        return true;
    }

    if(page > (array.length / limit)){
        res.status(404).send(`you have exceeded the maximum page of ${Math.ceil(array.length / limit)}`) 
        return true;
    }

}

module.exports = {validationError, genreError,doesItemExist, paginationError}