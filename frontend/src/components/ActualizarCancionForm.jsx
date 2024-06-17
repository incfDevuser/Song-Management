import React, { useState } from "react";

const ActualizarCancionForm = ({ cancion, actualizarCancion }) => {
  const [titulo, setTitulo] = useState(cancion.titulo);
  const [artista, setArtista] = useState(cancion.artista);
  const [tono, setTono] = useState(cancion.tono);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !artista || !tono) {
      return alert("Todos los campos son obligatorios");
    }
    await actualizarCancion(cancion.id, { titulo, artista, tono });
  };

  return (
    <div className="containerForm">
      <h2>Actualizar Cancion</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          className="inputTitulo"
          placeholder="Titulo de la cancion"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          className="inputArtista"
          placeholder="Artista de la cancion"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
        />
        <input
          type="text"
          className="inputTono"
          placeholder="Tono de la cancion"
          value={tono}
          onChange={(e) => setTono(e.target.value)}
        />
        <div className="containerBtn">
          <button className="btnAgregar" type="submit">
            Actualizar Cancion
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarCancionForm;
