const Joi = require('joi');

function validatedGenre(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(16).required(),
        description: Joi.string().min(3).max(200).required(),
    })
    return schema.validate(data)
}

function optionalValidatedGenre(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(16),
        description: Joi.string().min(3).max(200),
    })
    return schema.validate(data)
}


module.exports = {validatedGenre, optionalValidatedGenre}
