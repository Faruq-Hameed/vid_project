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

function validationError(validatedSchema, res){
    if (validatedSchema.error) {
        res.status(400).send(validatedSchema.error.details[0].message);
        return true;
    }
}

module.exports = {validatedGenre,validationError, optionalValidatedGenre}
