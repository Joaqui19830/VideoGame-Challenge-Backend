const { Router } = require("express");

const videoGamesRouter = Router();

const {
  getVideoGamesHandler,
  getVideoGameHandler,
  createVideoGameHandler,
} = require("../handlers/videoGamesHandler.js");

const validate = (req, res, next) => {
  const {
    name,
    descripcion,
    plataformas,
    fechaDeLanzamiento,
    rating,
    generosId,
  } = req.body;

  console.log(req.body);
  if (
    !name ||
    !descripcion ||
    !plataformas ||
    !fechaDeLanzamiento ||
    !rating ||
    !generosId
  ) res.status(400).json({error: "Faltan datos"});

  next();
};

videoGamesRouter.get("/", getVideoGamesHandler);

videoGamesRouter.get("/:idVideogame", getVideoGameHandler);

videoGamesRouter.post("/", validate,  createVideoGameHandler);

module.exports = videoGamesRouter;
