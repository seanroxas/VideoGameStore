import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function EditVideoGame() {
  const [title, setTitle] = useState("");
  const [developer, setDeveloper] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/videogames/${id}`)
      .then((response) => {
        setLoading(false);
        console.log(response.data.games);
        setDeveloper(response.data.games.developer);
        setReleaseYear(response.data.games.releaseYear);
        setTitle(response.data.games.title);
      })
      .catch((error) => {
        setLoading(false);
        alert("An Error Happened. Please Check Console");
        console.log(error);
      });
  }, []);

  const handleEditGame = () => {
    const data = {
      title,
      developer,
      releaseYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/videogames/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An Error Happened. Please Check Console");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Video Game</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Title </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Developer </label>
          <input
            type="text"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Release Year </label>
          <input
            type="text"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditGame}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditVideoGame;
