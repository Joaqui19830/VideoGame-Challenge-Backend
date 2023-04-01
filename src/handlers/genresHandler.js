const { getAllGenres } = require("../controllers/genresController.js");

const getGenresHandler = async (_, res) => {
  const result = await getAllGenres();
  res.status(200).json(result);
};

module.exports = { getGenresHandler };
