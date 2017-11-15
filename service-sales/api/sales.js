'use strict'

const status = require('http-status')
const validate = require('express-validation');
const validation = require('./validation/sale.js');
const services = require('../services/');

module.exports = (app, options) => {

    var repo = options.repo;

    // Create Ticket from sale
    app.post('/sales', validate(validation.sale), (req, res, next) => {

        const customersService = services.customersService
        const productsService = services.productsService
        const ticketsService = services.ticketsService

        let salesBody = req.body

        // Update customer loyaly
        customersService(salesBody.customer_id, salesBody.total)

        .then((percentage) => {
            var arrPromises = [];
            for (let [k, v] of Object.entries(salesBody.barcodes)) {
                arrPromises.push(productsService(v.barcode, v.quantity))
            }
            // Update all stock values
            return Promise.all(arrPromises)
        })

        .then(() => {
            // Register a new sale
            repo.createSale(salesBody).then(sale => {
                // Create ticket from sale
                ticketsService({ sale: sale }).then(ticket => {
                    res.status(status.OK).json(ticket)
                }).catch(next)

            }).catch(next)
        })

    })
}