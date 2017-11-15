var Joi = require('joi');

const sale = {
    body: {
        total: Joi.number().required(),
        customer_id: Joi.number().required(),
        barcodes: Joi.array().required()
    }
}

module.exports = Object.assign({}, { sale });