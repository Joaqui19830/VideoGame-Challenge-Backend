const { Router } = require("express");
const videoGamesRouter = require('./videoGamesRouter')
const genresRouter = require('./genresRouter')
// const getVideoGames = require("../routes/getVideoGames");
// const getDetailVideoGames = require("./getDetailVideoGames");
// const getGenres = require("./getGenres");
// const getVideoGamesByName =  require('./getVideoGameByName')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router(); 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videoGamesRouter );
router.use("/genres", genresRouter );
// router.get("/videogames/:idVideogame", getDetailVideoGames);
// router.get("/videogames/name?=", getVideoGamesByName);
// router.get("/genres", getGenres);

module.exports = router;
 