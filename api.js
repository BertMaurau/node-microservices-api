const express = require('express')
const proxy = require('http-proxy-middleware')

const customersProxy = proxy('/customers', { logLevel: "debug", target: 'https://localhost:3001', changeOrigin: true, secure: false });
const productsProxy = proxy('/products', { logLevel: "debug", target: 'https://localhost:3002', changeOrigin: true, secure: false });
const ticketsProxy = proxy('/tickets', { logLevel: "debug", target: 'https://localhost:3003', changeOrigin: true, secure: false });
const salesProxy = proxy('/sales', { logLevel: "debug", target: 'https://localhost:3004', changeOrigin: true, secure: false });

const app = express()

app.get('/', function(req, res) {
    res.send('API says Hello!');
})

app.use(customersProxy)
app.use(productsProxy)
app.use(ticketsProxy)
app.use(salesProxy)

app.listen(3000, function() {
    console.log("API listening on %s", 3000)
})