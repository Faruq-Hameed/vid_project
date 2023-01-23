const { validatedGenre, optionalValidatedGenre } = require('./schema')
const { validationError, genreError, doesItemExist } = require('./error')

module.exports = {validatedGenre, optionalValidatedGenre, validationError, genreError, doesItemExist}