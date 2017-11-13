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
                if (error) reject(new Error('An error occured fetching all cinemas, err:' + error));
                resolve(results)
            });
        });
    }

    const getCinemaById = (cinemaId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas WHERE id = " + cinemaId;

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching cinema by id, err:' + error));
                resolve(results[0]);
            });
        });
    }

    const getCinemaSchedule = (cinemaId) => {

        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas_schedule WHERE cinema_id = " + cinemaId + ";";

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching schedules, err:' + error));
                resolve(results);
            });
        });
    }

    const getCinemaScheduleByMovie = (options) => {

        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas_schedule WHERE movie_id = " + options.movieId + " AND cinema_id = " + options.cinemaId + ";";

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching schedules, err:' + error));
                resolve(results);
            });
        });
    }

    const getCinemaRoomById = (options) => {

        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas_rooms WHERE id = " + options.roomId + " AND cinema_id = " + options.cinemaId + ";";

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching room by id, err:' + error));
                resolve(results);
            });
        });
    }

    const getCinemaRooms = (cinemaId) => {
        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM cinemas_rooms WHERE cinema_id = " + cinemaId;

            connection.query(query, function(error, results, fields) {
                if (error) reject(new Error('An error occured fetching rooms for ciname, err:' + error));
                resolve(results);
            });
        });
    }

    return {
        getAllCinemas,
        getCinemaById,
        getCinemaSchedule,
        getCinemaScheduleByMovie,
        getCinemaRooms,
        getCinemaRoomById
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