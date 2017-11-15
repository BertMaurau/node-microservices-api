const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

module.exports = (customer_id, total_sales_price) => {
    return new Promise((resolve, reject) => {
        supertest('https://localhost:3001')
            .post('/customers/' + customer_id + '/update_loyalty')
            .send({ total_sales_price: total_sales_price })
            .end((err, res) => {
                if (err) {
                    reject(new Error('An error occured with the customer service, err: ' + err))
                }
                resolve(res.body)
            })
    })
}