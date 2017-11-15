'use strict'
const spdy = require('spdy')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')

const productsAPI = require('../api/products')

const start = (options) => {
    return new Promise((resolve, reject) => {
        if (!options.repo) {
            reject(new Error('The server must be started with a connected repository'))
        }
        if (!options.port) {
            reject(new Error('The server must be started with an available port'))
        }
        const app = express()
        app.use(morgan('dev'))
        app.use(helmet())
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong! Error:' + err))
            res.status(500).send('Something went wrong!')
        })

        // Add middleware to handle post requests
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.get('/', (req, res, next) => {
            res.status(200).json('ok')
        })

        productsAPI(app, options)

        const server = spdy.createServer(options.ssl, app).listen(options.port, () => resolve(server))
    })
}

module.exports = Object.assign({}, { start })