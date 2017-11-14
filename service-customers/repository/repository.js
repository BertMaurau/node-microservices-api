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

    const getCustomers = (filter) => {

        // Define the allowed filter params
        const allowedParams = ['name', 'email'];

        return new Promise((resolve, reject) => {

            var query = "SELECT customers.* FROM customers ";
            var values = [];

            // Build the WHERE condition depending on given filters
            if (Object.keys(filter).length > 0) {

                var filters = "";

                // Loop given filter keys
                for (let [k, v] of Object.entries(filter)) {
                    // Check if filter is allowed for this request
                    if (allowedParams.indexOf(k) > -1) {
                        // Add to the query
                        filters += k + " LIKE ? ";
                        // Add to the values to escape
                        values.push('%' + v + '%');
                    }
                };

                if (values.length > 0) {
                    // Add WHERE to query
                    query += "WHERE " + filters;
                }
            }

            connection.query(query, values, function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Customers. Error:' + err));
                resolve(results)
            });
        });
    }

    const getCustomerById = (customerId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT customers.* FROM customers WHERE id = ? LIMIT 1;";

            connection.query(query, [customerId], function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Customer ' + customerId + '. Error:' + err));
                resolve(results[0]);
            });
        });
    }

    const createCustomer = (customer) => {
        return new Promise((resolve, reject) => {

            // Set the default value so it gets returned nicely after insert instead of 'null'
            customer.loyalty_discount = customer.loyalty_discount || 0;

            const query = "INSERT INTO customers (name, email, loyalty_discount) VALUES (?, ?, ?);";

            connection.query(query, [customer.name, customer.email, customer.loyalty_discount], function(err, result) {
                if (err) reject(new Error('An error occured while inserting Customer ' + customer.name + '. Error:' + err));

                // Set the ID and return the customer
                customer.id = result.insertId;
                resolve(customer);
            });
        });
    }
    return {
        getCustomers,
        getCustomerById,
        createCustomer
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