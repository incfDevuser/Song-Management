import { useState, useEffect } from "react";
import CancionForm from "./components/CancionForm";
import Canciones from "./components/Canciones";
import ActualizarCancionForm from "./components/ActualizarCancionForm";
import "./App.css";

function App() {
  const [canciones, setCanciones] = useState([]);
  const [cancionSeleccionada, setCancionSeleccionada] = useState(null);

  // Declaracion de las funciones, para consumir las APIs
  const getCanciones = async () => {
    const response = await fetch("http://localhost:3000/canciones");
    const canciones = await response.json();
    setCanciones(canciones);
  };

  // Renderizar las canciones
  useEffect(() => {
    getCanciones();
  }, []);

  // Usaremos la funcion para añadir una cancion
  const agregarCancion = async (titulo, artista, tono) => {
    const response = await fetch("http://localhost:3000/canciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, artista, tono }),
    });
    const cancion = await response.json();
    setCanciones([...canciones, cancion]);
  };

  // Funcion para eliminar una cancion
  const eliminarCancion = async (id) => {
    const response = await fetch(`http://localhost:3000/canciones/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      return alert("Hubo un error con la operación");
    }
    setCanciones(canciones.filter((cancion) => cancion.id !== id));
  };

  // Funcion para actualizar una cancion
  const actualizarCancion = async (id, datosActualizados) => {
    try {
      const response = await fetch(`http://localhost:3000/canciones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });

      if (response.status !== 200) {
        return alert("Hubo un problema con la operación");
      }

      const cancionActualizada = await response.json();

      setCanciones(
        canciones.map((cancion) =>
          cancion.id === id ? cancionActualizada : cancion
        )
      );
      setCancionSeleccionada(null);
    } catch (error) {
      alert("Hubo un problema con la operación");
    }
  };

  const seleccionarCancion = (cancion) => {
    setCancionSeleccionada(cancion);
  };

  return (
    <div className="containerApp">
      <h1>Agrega una cancion</h1>
      <CancionForm addCancion={agregarCancion} />
      {cancionSeleccionada && (
        <ActualizarCancionForm
          cancion={cancionSeleccionada}
          actualizarCancion={actualizarCancion}
        />
      )}
      <div className="canciones">
        <Canciones
          canciones={canciones}
          eliminarCancion={eliminarCancion}
          seleccionarCancion={seleccionarCancion}
        />
      </div>
    </div>
  );
}

export default App;
