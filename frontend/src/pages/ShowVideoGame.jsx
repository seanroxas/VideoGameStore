import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function ShowVideoGame() {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/videogames/${id}`)
      .then((response) => {
        setGame(response.data.games);
        setLoading(false);
        console.log(game);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">ID</span>
            <span>{game._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{game.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Developer</span>
            <span>{game.developer}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Release Year</span>
            <span>{game.releaseYear}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowVideoGame;
