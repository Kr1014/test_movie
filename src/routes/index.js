const express = require('express');
const routerActor = require('./actor.route');
const routerDirector = require('./director.route');
const routerGenre = require('./genre.route');
const routerMovie = require('./movie.route');
const router = express.Router();

// colocar las rutas aquí

router.use('/actors', routerActor)
router.use('/directors', routerDirector)
router.use('/genres', routerGenre)
router.use('/movies', routerMovie)


module.exports = router;