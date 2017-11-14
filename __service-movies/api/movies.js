'use strict'

// Return HTTP code either with an HTTP code or a message name.
const status = require('http-status')

module.exports = (app, options) => {

    var repo = options.repo;

    // here we get all the movies 
    app.get('/movies', (req, res, next) => {
        repo.getAllMovies().then(movies => {
            res.status(status.OK).json(movies)
        }).catch(next)
    })

    // here we retrieve only the premieres
    app.get('/movies/premieres', (req, res, next) => {
        repo.getMoviePremiers().then(movies => {
            res.status(status.OK).json(movies)
        }).catch(next)
    })

    // here we get a movie by id
    app.get('/movies/:id', (req, res, next) => {
        repo.getMovieById(req.params.id).then(movie => {
            res.status(status.OK).json(movie)
        }).catch(next)
    })
}