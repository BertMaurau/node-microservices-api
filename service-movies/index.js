'use strict'
// we load all the depencies we need
const { EventEmitter } = require('events')

const mediator = new EventEmitter()
const mysql = require('mysql')
const repository = require('./repository/repository')
const server = require('./server/server')
const config = require('./config/config')

// verbose logging when we are starting the server
console.log('--- Movies Service ---')
console.log('Connecting to movies repository...')

// log unhandled execpetions
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
})
process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
})

repository.connect()

// Start the server with its functions and parameters..
.then(repo => {
    console.log('Repository Connected. Starting Server')
    return server.start({
        port: config.serverSettings.port,
        repo
    })
})

// If the server started succesfully, start the express server
.then(app => {
    console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
    app.on('close', () => {
        //rep.disconnect()
    })
})