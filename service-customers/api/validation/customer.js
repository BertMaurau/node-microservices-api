var Joi = require('joi');

const customer = {
    body: {
        email: Joi.string().email(),
        name: Joi.string().required()
    }
}

const loyalty = {
    body: {
        total_sales_price: Joi.number()
    }
}

module.exports = Object.assign({}, { customer, loyalty });