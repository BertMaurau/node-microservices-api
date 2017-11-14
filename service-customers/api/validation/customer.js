var Joi = require('joi');

const customer = {
    body: {
        email: Joi.string().email(),
        name: Joi.string().required()
    }
}

module.exports = Object.assign({}, { customer });