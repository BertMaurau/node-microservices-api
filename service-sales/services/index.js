const customersService = require('./customers.service')
const productsService = require('./products.service')
const ticketsService = require('./tickets.service')

module.exports = Object.assign({}, { customersService, productsService, ticketsService })