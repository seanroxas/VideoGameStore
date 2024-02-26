import path from "path";
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { videoGame } from "./models/videoGameModel.js";
import gamesRoute from "./routes/gamesRoute.js";
import cors from "cors";

const __dirname = path.resolve();

const app = express();

//middleware for parsing request body
app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(234).send("Welcome to MERN Stack Tutorial");
// });

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
app.use("/videogames", gamesRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`app connected to ${mongoDBURL}`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
