const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

module.exports = (sale) => {
    return new Promise((resolve, reject) => {
        supertest('https://localhost:3003')
            .post('/tickets')
            .send(sale)
            .end((err, res) => {
                if (err) {
                    reject(new Error('An error occured with the tickets service, err: ' + err))
                }
                resolve(res.body)
            })
    })
}