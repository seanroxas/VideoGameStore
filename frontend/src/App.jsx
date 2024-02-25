import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateVideoGame from "./pages/CreateVideoGame";
import DeleteVideoGame from "./pages/DeleteVideoGame";
import EditVideoGame from "./pages/EditVideoGame";
import ShowVideoGame from "./pages/ShowVideoGame";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videogames/create" element={<CreateVideoGame />} />
        <Route path="/videogames/delete/:id" element={<DeleteVideoGame />} />
        <Route path="/videogames/edit/:id" element={<EditVideoGame />} />
        <Route path="/videogames/details/:id" element={<ShowVideoGame />} />
      </Routes>
    </>
  );
}

export default App;
