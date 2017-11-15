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

    const getProducts = (filter) => {

        // Define the allowed filter params
        const allowedParams = ['name', 'season', 'brand', 'color'];

        return new Promise((resolve, reject) => {

            var query = "SELECT products.* FROM products ";
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
                if (err) reject(new Error('An error occured while fetching Products. Error:' + err));
                resolve(results)
            });
        });
    }

    const getProductById = (productId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT products.* FROM products WHERE id = ? LIMIT 1;";

            connection.query(query, [productId], function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Product ' + productId + '. Error:' + err));
                resolve(results[0]);
            });
        });
    }

    const getSizesByProductId = (productId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT products_sizes.* FROM products_sizes WHERE product_id = ?;";

            connection.query(query, [productId], function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Sizes for Product ' + productId + '. Error:' + err));
                resolve(results);
            });
        });
    }

    const getSizeById = (productId, sizeId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT products_sizes.* FROM products_sizes WHERE id = ? AND product_id = ? LIMIT 1;";

            connection.query(query, [sizeId, productId], function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Size ' + sizeId + '. Error:' + err));
                resolve(results[0]);
            });
        });
    }

    const getProductByBarcode = (barcode) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT products.* FROM products LEFT JOIN products_sizes ON products_sizes.product_id = products.id WHERE products_sizes.barcode = ? LIMIT 1;";

            connection.query(query, [barcode], function(err, results, fields) {
                if (err) reject(new Error('An error occured while fetching Product with barcode ' + barcode + '. Error:' + err));
                resolve(results[0]);
            });
        });
    }

    const createProduct = (product) => {
        return new Promise((resolve, reject) => {

            const query = "INSERT INTO products (name, season, brand, color, price) VALUES (?, ?, ?, ?, ?);";

            connection.query(query, [product.name, product.season, product.brand, product.color, product.price], function(err, result) {
                if (err) reject(new Error('An error occured while inserting Product ' + product.name + '. Error:' + err));

                // Set the ID and return the Product
                product.id = result.insertId;
                resolve(product);
            });
        });
    }
    return {
        getProducts,
        getProductById,
        createProduct,
        getSizesByProductId,
        getSizeById,
        getProductByBarcode
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