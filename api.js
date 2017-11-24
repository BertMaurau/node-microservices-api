const express = require('express')
const bodyParser = require('body-parser')
const proxy = require('http-proxy-middleware')
const oauthserver = require('node-oauth2-server');
const mongoose = require('mongoose')


var uristring = 'mongodb://localhost/test';
mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

const app = express()

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = new oauthserver({
    model: require('./models/models'),
    //grants: ['password', 'authorization_code', 'refresh_token'],
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 4 * 60 * 60,
    debug: true
});

app.all('/oauth/token', app.oauth.grant());

// Index
app.get('/', function(req, res) {
    res.send('API says Hello!');
})

app.get('/oauth/authorise', function(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/session?redirect=' + req.path + '&client_id=' +
            req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
    }

    res.render('authorise', {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});

// Handle authorise
app.post('/oauth/authorise', function(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/session?redirect=' + req.path + 'client_id=' +
            req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
    }

    next();
}, app.oauth.authCodeGrant(function(req, next) {
    next(null, req.body.allow === 'yes', req.session.userId, null);
}));

// Auth check
app.get('/secret', app.oauth.authorise(), function(req, res) {
    res.send('Secret area');
});

const customersProxy = proxy('/customers', { logLevel: "debug", target: 'https://localhost:3001', changeOrigin: true, secure: false });
const productsProxy = proxy('/products', { logLevel: "debug", target: 'https://localhost:3002', changeOrigin: true, secure: false });
const ticketsProxy = proxy('/tickets', { logLevel: "debug", target: 'https://localhost:3003', changeOrigin: true, secure: false });
const salesProxy = proxy('/sales', { logLevel: "debug", target: 'https://localhost:3004', changeOrigin: true, secure: false });

// Services forwarding
app.use(customersProxy)
app.use(productsProxy)
app.use(ticketsProxy)
app.use(salesProxy)

app.use(app.oauth.errorHandler());


// Start server
app.listen(app.get('port'), function() {
    console.log("API listening on %s", app.get('port'))
})