const axios = require("axios");
const {  Generos } = require("../db.js");

const getAllGenres = async () => {
  const databaseGenres = await Generos.findAll();

  if (databaseGenres.length !== 0) {
    return databaseGenres;
  } else {
    const apiGenresRaw = (
      await axios.get(
        "https://api.rawg.io/api/genres?key=c592a6054e1b495c85ee3ef3af87c260"
      )
    ).data.results;

    apiGenresRaw.forEach(async (element) => {
      await Generos.create({
        id: element.id,
        name: element.name,
      });
    });

    return apiGenresRaw.map((element) => {
      return {
        id: element.id,
        name: element.name,
      };
    });
  }
};

module.exports = { getAllGenres };
