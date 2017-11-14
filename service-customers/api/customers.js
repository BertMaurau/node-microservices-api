'use strict'

const status = require('http-status')
const validate = require('express-validation');
const validation = require('./validation/customer.js');

module.exports = (app, options) => {

    var repo = options.repo;

    // Get all customers
    app.get('/customers', (req, res, next) => {
        repo.getCustomers(req.query).then(customers => {
            res.status(status.OK).json(customers)
        }).catch(next)
    })

    // Create customer
    app.post('/customers', validate(validation.customer), (req, res, next) => {
        repo.createCustomer(req.body).then(customers => {
            res.status(status.OK).json(customers)
        }).catch(next)
    })

    // Get customer by ID
    app.get('/customers/:id', (req, res, next) => {
        repo.getCustomerById(req.params.id).then(customer => {
            res.status(status.OK).json(customer)
        }).catch(next)
    })
}