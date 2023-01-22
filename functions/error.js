
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

function doesItemExist(arr1,arr2, key1,key2, res) {
    if (key2) {//checking if the new name provided already exists
        for (element of arr1) {
            if (element[key2] !== arr2[key2] && element[key2].toLowerCase() === key1.toLowerCase()) {//only check if the element (genre object) is not the current genre  
                res.status(409).send(`${key2} ${element[key2]} already exists`)
                return true
            }
        }
    }
}

module.exports = {validationError, genreError,doesItemExist}