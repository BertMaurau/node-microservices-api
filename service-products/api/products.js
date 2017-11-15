'use strict'

const status = require('http-status')
const validate = require('express-validation');
const validation = require('./validation/product.js');

module.exports = (app, options) => {

    var repo = options.repo;

    // Get all products
    app.get('/products', (req, res, next) => {
        repo.getProducts(req.query).then(products => {
            res.status(status.OK).json(products)
        }).catch(next)
    })

    // Create product
    app.post('/products', validate(validation.product), (req, res, next) => {
        repo.createProduct(req.body).then(product => {
            res.status(status.OK).json(product)
        }).catch(next)
    })

    // Get product by ID
    app.get('/products/:id', (req, res, next) => {
        repo.getProductById(req.params.id).then(product => {
            res.status(status.OK).json(product)
        }).catch(next)
    })

    // Get product Sized by Product ID
    app.get('/products/:id/sizes', (req, res, next) => {
        repo.getSizesByProductId(req.params.id).then(sizes => {
            res.status(status.OK).json(sizes)
        }).catch(next)
    })

    // Get product Size by Product ID and Size ID
    app.get('/products/:productId/sizes/:id', (req, res, next) => {
        repo.getSizeById(req.params.productId, req.params.id).then(size => {
            res.status(status.OK).json(size)
        }).catch(next)
    })

    // Get product by Barcode
    app.get('/products/barcode/:barcode', (req, res, next) => {
        repo.getProductByBarcode(req.params.barcode).then(product => {
            res.status(status.OK).json(product)
        }).catch(next)
    })
}