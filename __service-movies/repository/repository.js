'use strict'

const mysql = require('mysql')
const config = require('../config/config')

const connection = mysql.createConnection({
    host: config.dbSettings.host,
    user: config.dbSettings.user,
    password: config.dbSettings.pass,
    database: config.dbSettings.db
});

const repository = () => {

    const getAllMovies = () => {
        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM movies";

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching all movies, err:' + err));
                resolve(results)
            });
        });
    }

    const getMoviePremiers = () => {
        return new Promise((resolve, reject) => {

            const currentDay = new Date()
            const query = "SELECT * FROM movies WHERE " +
                "releaseDate >= '" + currentDay.getFullYear() + "-" + (currentDay.getMonth() + 1) + "-" + currentDay.getDate();

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching all movies, err:' + err));
                resolve(results)
            });
        });
    }

    const getMovieById = (id) => {
        return new Promise((resolve, reject) => {

            const movies = []
            const currentDay = new Date()
            const query = "SELECT * FROM movies WHERE id = " + id;

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching movie by id, err:' + err));
                resolve(results[0]);
            });
        });
    }

    return {
        getAllMovies,
        getMoviePremiers,
        getMovieById
    }
}

// Gets called on index
const connect = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject('error connecting: ' + err.stack);
            }
            // Return the repo object with its functions
            resolve(repository());
        });
    });
}

// Only asssign the connect. Everything else gets handled within the promise
module.exports = Object.assign({}, { connect })