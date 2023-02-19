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

function paginationSchema(input) {
    const result = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).default(3),
    })
    return result.validate(input)// returning a validated value
}

module.exports = {validatedGenre, optionalValidatedGenre, paginationSchema}
