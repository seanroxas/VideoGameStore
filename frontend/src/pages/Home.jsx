import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get("http://localhost:5555/videogames")
        .then((response) => {
          setGames(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Unexpected error in useEffect:", error);
      setLoading(false);
    }
  }, []);

  return (
    <div className="P-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Games List</h1>
        <Link to="/videogames/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md-hidden">
                Developer
              </th>
              <th className="border border-slate-600 rounded-md max-md-hidden">
                Release Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game._id} className="h-8">
                <td className=" border-slate-700 rounded-md text-center">
                  {" "}
                  {index + 1}
                </td>
                <td className=" border-slate-700 rounded-md text-center">
                  {" "}
                  {game.title}
                </td>
                <td className=" border-slate-700 rounded-md text-center">
                  {" "}
                  {game.developer}
                </td>
                <td className=" border-slate-700 rounded-md text-center">
                  {" "}
                  {game.releaseYear}
                </td>
                <td className=" border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/videogames/details/${game._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/videogames/edit/${game._id}`}>
                      <CiEdit className="text-2xl text-yellow-800" />
                    </Link>
                    <Link to={`/videogames/delete/${game._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
