import React from "react";
import "../styles/Cancion.css";


const Cancion = ({ cancion, eliminarCancion, seleccionarCancion }) => {
  return (
    <div className="contenedorCancion">
      <li className="listItemCancion">
        <div className="contenedorTable">
          <tr className="tableDisplay">
            <td className="titulo">{cancion.titulo}</td>
            <td className="artista">{cancion.artista}</td>
            <td className="tono">{cancion.tono}</td>
          </tr>
          <div className="btnContainer">
            <button className="btnActualizar" onClick={() => seleccionarCancion(cancion)}>
              Actualizar
            </button>
            <button className="btnEliminar" onClick={() => eliminarCancion(cancion.id)}>
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Cancion;
