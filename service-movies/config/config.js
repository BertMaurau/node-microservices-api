// Main database parameters
// - Gets used in repository.js
const dbSettings = {
    db: process.env.DB || 'nodejs_movies',
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || '',
    host: process.env.DB_PASS || 'localhost',
}

// Server parameters
// - Gets used in index.s
const serverSettings = {
    port: process.env.PORT || 3000,
    ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings })