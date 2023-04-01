// const {createVideoGame} = require('../controllers/videoGamesControllers')
const {
  createVideoGame,
  getVideoGameById,
  searchVideoGameByName,
  getAllVideoGames,
} = require("../controllers/videoGamesControllers");

const getVideoGamesHandler = async (req, res) => {
  const { name } = req.query;

  const results = name
    ? await searchVideoGameByName(name)
    : await getAllVideoGames();

  res.status(200).json(results);
};

const getVideoGameHandler = async (req, res) => {
  const { idVideogame } = req.params;

  const source = isNaN(idVideogame) ? "bdd" : "api";

  try {
    const videoGame = await getVideoGameById(idVideogame, source);
    res.status(200).json(videoGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//VER PARA CREAR UN VIDEOGAME
const createVideoGameHandler = async (req, res) => {
  try {
    const {
      name,
      descripcion,
      plataformas,
      imagen,
      fechaDeLanzamiento,
      rating,
      generosId,
    } = req.body;
    const newVideoGame = await createVideoGame(
      name,
      descripcion,
      plataformas,
      imagen,
      fechaDeLanzamiento,
      rating,
      generosId
    );
    res.status(200).json({ newVideoGame, message: "Creado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideoGamesHandler,
  getVideoGameHandler,
  createVideoGameHandler,
};
