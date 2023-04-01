const {Router} = require('express');

const genresRouter = Router()

const {getGenresHandler} = require('../handlers/genresHandler.js')

genresRouter.get('/', getGenresHandler )


module.exports = genresRouter;