var Joi = require('joi');

const ticket = {
    body: {
        sale: Joi.object().required()
    }
}

module.exports = Object.assign({}, { ticket });