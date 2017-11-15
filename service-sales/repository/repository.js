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

    const createSale = (sale) => {
        return new Promise((resolve, reject) => {

            const query = "INSERT INTO sales (date, customer_id, total) VALUES (NOW(), ?, ?);";

            connection.query(query, [sale.customer_id, sale.total], function(err, result) {
                if (err) reject(new Error('An error occured while inserting Sale for Customer ' + sale.customer_id + '. Error:' + err));

                // Set the ID and return the Product
                sale.id = result.insertId;
                resolve(sale);
            });
        });
    }
    return {
        createSale
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