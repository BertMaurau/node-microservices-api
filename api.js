const express = require('express')
const proxy = require('http-proxy-middleware')

const customersProxy = proxy('/customers', { logLevel: "debug", target: 'https://localhost:3001', changeOrigin: true, secure: false });
const productsProxy = proxy('/products', { logLevel: "debug", target: 'https://localhost:3002', changeOrigin: true, secure: false });
const ticketsProxy = proxy('/tickets', { logLevel: "debug", target: 'https://localhost:3003', changeOrigin: true, secure: false });
const salesProxy = proxy('/sales', { logLevel: "debug", target: 'https://localhost:3004', changeOrigin: true, secure: false });

const app = express()

// Function that gets called before each request
function middelwareValidation() {

    // Check headers, validate oAuth, logging,...
    return true;
}

// Index
app.get('/', function(req, res) {
    res.send('API says Hello!');
})

// Other route sthat don't need authentication..
// ..

// Assign the Middleware
app.use(function(req, res, next) {

    if (middelwareValidation()) {

        // Allowed.. continue the router
        next();
    } else {

        // End request here
        res.send("Failed to Validate");
    }
})

// Services forwarding
app.use(customersProxy)
app.use(productsProxy)
app.use(ticketsProxy)
app.use(salesProxy)

// Start server
app.listen(3000, function() {
    console.log("API listening on %s", 3000)
})