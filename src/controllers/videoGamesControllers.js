const { Videogame, Generos } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const createVideoGame = async (
  name,
  descripcion,
  plataformas,
  imagen,
  fechaDeLanzamiento,
  rating,
  generosId
) => {
  const newVideoGame = await Videogame.create({
    name,
    descripcion,
    plataformas,
    imagen,
    fechaDeLanzamiento,
    rating,
  });
  newVideoGame.setGeneros([...generosId]);
  return newVideoGame;
};

const getVideoGameById = async (idVideogame, source) => {
  const videoGame =
    source === "api"
      ? (
          await axios.get(
            `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
          )
        ).data
      : await Videogame.findByPk(idVideogame);

  return videoGame;
};

// `https://api.rawg.io/api/games?key=${API_KEY}`

const getAllVideoGames = async () => {
  // buscar en la bdd
  const databaseVideoGame = await Videogame.findAll({
    include: [
      {
        model: Generos,
        through: { attributes: [] }, // using empty array will cause not to return the relation fields at all
      },
    ],
  });

  const apiVideoGameRaw = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    )
  ).data.results;

  const apiVideoGame = cleanArray(apiVideoGameRaw);

  return [...databaseVideoGame, ...apiVideoGame];
};

const cleanArray = (arr) =>
  arr.map((element) => {
    const plataforma = element.platforms.map((item) => item.platform.name);
    const genero = element.genres.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    return {
      id: element.id,
      name: element.name,
      descripcion: element.description ?? "",
      plataformas: plataforma,
      generos: genero,
      imagen: element.background_image,
      fechaDeLanzamiento: element.released,
      rating: element.rating,
      created: false,
    };
  });

const searchVideoGameByName = async (name) => {
  const databaseVideoGame = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  const apiVideoGameByName = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    )
  ).data.results;

  return [...databaseVideoGame, ...apiVideoGameByName].slice(0, 15);
};

module.exports = {
  createVideoGame,
  getVideoGameById,
  searchVideoGameByName,
  getAllVideoGames,
};
