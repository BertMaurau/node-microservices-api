'use strict'

// Return HTTP code either with an HTTP code or a message name.
const status = require('http-status')

module.exports = (app, options) => {

    var repo = options.repo;

    app.get('/cinemas', (req, res, next) => {
        repo.getAllCinemas((req.query.zip) ? req.query.zip : null).then(cinemas => {
            res.status(status.OK).json(cinemas)
        }).catch(next)
    })

    app.get('/cinemas/:cinemaId', (req, res, next) => {
        repo.getCinemaById(req.params.cinemaId).then(cinema => {
            res.status(status.OK).json(cinema)
        }).catch(next)
    })

    app.get('/cinemas/:cinemaId/rooms', (req, res, next) => {
        repo.getRoomsForCinema(req.params.cinemaId).then(cinema => {
            res.status(status.OK).json(cinema)
        }).catch(next)
    })

    app.get('/cinemas/:zip/:movieId', (req, res, next) => {
        const params = {
            zip: req.params.zip,
            movieId: req.params.movieId
        }
        repo.getCinemaScheduleByMovie(params).then(cinemas => {
            res.status(status.OK).json(cinemas)
        }).catch(next)
    })


}