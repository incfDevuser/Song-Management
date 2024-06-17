import React, { useState } from "react";
import "../styles/Form.css";
import { FaHeadphones } from "react-icons/fa6";
import { GiMicrophone } from "react-icons/gi";
import { IoMusicalNotes } from "react-icons/io5";
const CancionForm = ({ addCancion }) => {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [tono, setTono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !artista || !tono) {
      return alert("Todos los campos son obligatorios");
    }
    await addCancion(titulo, artista, tono);
    setTitulo("");
    setArtista("");
    setTono("");
  };

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit} className="form">
        <div className="song">
          <FaHeadphones />
          <input
            type="text"
            className="inputTitulo"
            placeholder="Titulo de la cancion"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="artist">
        <GiMicrophone />
          <input
            type="text"
            className="inputArtista"
            placeholder="Artista de la cancion"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
          />
        </div>
        <div className="tono">
        <IoMusicalNotes />
          <input
            type="text"
            className="inputTono"
            placeholder="Tono de la cancion"
            value={tono}
            onChange={(e) => setTono(e.target.value)}
          />
        </div>
        <div className="containerBtn">
          <button className="btnAgregar" type="submit">
            Agregar Cancion
          </button>
        </div>
      </form>
    </div>
  );
};

export default CancionForm;
