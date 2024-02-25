import express from "express";

import { videoGame } from "../models/videoGameModel.js";

const router = express.Router();

//add a new video game
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.developer ||
      !request.body.releaseYear
    ) {
      return response.status(400).send({
        message: "Send all required Fields: title, developer, releaseYear",
      });
    }
    const newVideoGame = {
      title: request.body.title,
      developer: request.body.developer,
      releaseYear: request.body.releaseYear,
    };
    const videogame = await videoGame.create(newVideoGame);

    return response.status(201).send(videogame);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all video games
router.get("/", async (request, response) => {
  try {
    const games = await videoGame.find({});
    return response.status(200).json({
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one video games
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const games = await videoGame.findById(id);
    return response.status(200).json({ games });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update a videogame
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.developer ||
      !request.body.releaseYear
    ) {
      return response.status(400).send({
        message: "Send all required Fields: title, developer, releaseYear",
      });
    }

    const { id } = request.params;
    const result = await videoGame.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "game not found" });
    }

    return response.status(200).send({ message: "game was updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update a videogame
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await videoGame.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "game not found" });
    }
    return response.status(200).send({ message: "game was deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
