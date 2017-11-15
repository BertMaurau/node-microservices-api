'use strict'

const mysql = require('mysql')
const config = require('../config/config')

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.pass,
    database: config.db.name
});

const repository = () => {

    const createTicket = (ticket) => {
        return new Promise((resolve, reject) => {

            const query = "INSERT INTO tickets (sales_id, body) VALUES (?, ?);";

            connection.query(query, [ticket.sale.id, JSON.stringify(ticket)], function(err, result) {
                if (err) reject(new Error('An error occured while inserting Ticket for sale ' + ticket.sale.id + '. Error:' + err));

                // Set the ID and return the Product
                ticket.id = result.insertId;
                resolve(ticket);
            });
        });
    }

    const getTicketById = (ticketId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT tickets.* FROM tickets WHERE id = ? LIMIT 1;";

            connection.query(query, [ticketId], function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Ticket ' + ticketId + '. Error:' + err));
                resolve(results[0]);
            });
        });
    }

    return {
        createTicket,
        getTicketById
    }
}

const connect = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject('error connecting: ' + err.stack);
            }
            resolve(repository());
        });
    });
}

module.exports = Object.assign({}, { connect })