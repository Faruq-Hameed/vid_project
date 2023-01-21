const {getById, getIndexById, getObjectByAny} = require('./methods')
const {validatedGenre,validationError, optionalValidatedGenre} = require('./schema')

module.exports = {getById, getIndexById, validatedGenre,validationError,optionalValidatedGenre, getObjectByAny}

