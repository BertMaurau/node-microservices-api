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

    const getAllCinemas = (zip) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas " + ((zip) ? "WHERE zip = '" + zip + "'" : "");

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching all cinemas, err:' + err));
                resolve(results)
            });
        });
    }

    const getCinemaById = (cinemaId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas WHERE id = " + cinemaId;

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching movie by id, err:' + err));
                resolve(results[0]);
            });
        });
    }

    const getCinemaScheduleByMovie = (options) => {

        return new Promise((resolve, reject) => {

            const query = "SELECT cinemas_schedule.* FROM cinemas_schedule " +
                "LEFT JOIN cinemas ON cinemas.id = cinemas_schedule.cinema_id " +
                "WHERE cinemas_schedule.movie_id = " + options.movieId + " AND cinemas.zip = '" + options.zip + "';";

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching movie by id, err:' + err));
                resolve(results);
            });
        });
    }

    const getRoomsForCinema = (cinemaId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas_rooms WHERE cinema_id = " + cinemaId;

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching movie by id, err:' + err));
                resolve(results);
            });
        });
    }

    return {
        getAllCinemas,
        getCinemaById,
        getCinemaScheduleByMovie,
        getRoomsForCinema
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