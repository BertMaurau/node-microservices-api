const db = {
    name: process.env.DB || 'nodejs_products',
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || '',
    host: process.env.DB_PASS || 'localhost',
}

const server = {
    port: process.env.PORT || 3004,
    ssl: require('./ssl')
}

module.exports = Object.assign({}, { db, server })