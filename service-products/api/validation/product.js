var Joi = require('joi');

const product = {
    body: {
        name: Joi.string().required(),
        season: Joi.string().required(),
        brand: Joi.string().required(),
        color: Joi.string().required(),
        price: Joi.number().required()
    }
}

const lower_stock = {
    body: {
        quantity: Joi.number().required()
    }
}


module.exports = Object.assign({}, { product, lower_stock });