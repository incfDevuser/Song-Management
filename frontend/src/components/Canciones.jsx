import React from 'react';
import Cancion from './Cancion';
import '../styles/ListaCanciones.css';

const Canciones = ({ canciones, eliminarCancion, seleccionarCancion }) => {
  return (
    <div>
      {canciones.length === 0 ? (
        <h5>No hay canciones disponibles</h5>
      ) : (
        <table className="tablaCanciones">
          <h2>Canciones Disponibles</h2>
          <tbody>
            {canciones.map((cancion) => (
              <Cancion
                key={cancion.id}
                cancion={cancion}
                eliminarCancion={eliminarCancion}
                seleccionarCancion={seleccionarCancion}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Canciones;
