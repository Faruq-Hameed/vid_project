const { validatedGenre, optionalValidatedGenre, paginationSchema } = require('./schema')
const { validationError, genreError, doesItemExist , paginationError} = require('./error')

module.exports = {
    validatedGenre, optionalValidatedGenre, paginationSchema,
    validationError, genreError, doesItemExist,paginationError
}