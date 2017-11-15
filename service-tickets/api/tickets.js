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
}