'use strict'

const status = require('http-status')
const validate = require('express-validation');
const validation = require('./validation/ticket.js');

module.exports = (app, options) => {

    var repo = options.repo;

    // Create Ticket from sale
    app.post('/tickets', validate(validation.ticket), (req, res, next) => {
        repo.createTicket(req.body).then(ticket => {
            res.status(status.OK).json(ticket)
        }).catch(next)
    })

    // Get ticket by ID
    app.get('/tickets/:id', (req, res, next) => {
        repo.getTicketById(req.params.id).then(ticket => {
            ticket.body = ticket.body.toString('utf-8')
            res.status(status.OK).json(ticket)
        }).catch(next)
    })
}