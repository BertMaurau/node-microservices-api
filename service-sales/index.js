'use strict'

const { EventEmitter } = require('events')
const mediator = new EventEmitter()

const mysql = require('mysql')
const repository = require('./repository/repository')
const server = require('./server/server')
const config = require('./config/config')

const debug = require('debug')('service-sales')

console.log('----- Service - Sales -----')
console.log(' + Connecting to Sales repository...')

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
})


repository.connect()
    .then(repo => {
        console.log(' + Repo Connected. Starting Server..')
        return server.start({
            port: config.server.port,
            ssl: config.server.ssl,
            repo
        })
    })
    .then(app => {
        console.log(' + Server started succesfully. Running on port: ' + config.server.port + '.')
        app.on('close', () => {
            // Handle stuff here to do on close.
            console.log(' + Shutting down..');
        })
    })