const Joi = require('joi');
function genreJoiSchema(data) {
    const result = Joi.object({
        name: Joi.string().lowercase().min(2).required()
    })
    return result.validate(data)// returning a validated value
}
 

function movieJoiSchema(data) {
    const result = Joi.object({
        title: Joi.string().lowercase().min(2).required(),
        numberInStock: Joi.number().min(0).required()
    })
    return result.validate(data)// returning a validated value
}
 

function customerJoiSchema(data){
    const result = Joi.object({
        name: Joi.string().lowercase().min(2).required(),
        phone: Joi.number().required()
    })
    return result.validate(data)// returning a validated value

}
module.exports = {genreJoiSchema,movieJoiSchema,customerJoiSchema}