import express from 'express'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { writeFile, readFile} from 'node:fs/promises'
import cors from 'cors'
const app = express()

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.listen(port, ()=>{
    console.log(`Servidor escuchando en el pureto ${port}`)
})
app.get("/", (req, res)=>{
    res.send("Hola mundo desde express")
})
//Obtener las canciones
const getCanciones = async()=>{
    const response = await readFile("./canciones.json", "utf-8")
    const canciones = JSON.parse(response)
    return canciones
}
//API para mostrar las canciones
app.get("/canciones", async(req, res)=>{
    const canciones = await getCanciones()
    res.json(canciones)
})
//Obtener la cancion por su id
app.get("/canciones/:id", async(req, res)=>{
    const { id } = req.params;
    const canciones = await getCanciones();
    //Buscar el id
    const cancion = canciones.find((cancion)=> cancion.id == id);
    //Si la cancion no existe
    if(!cancion){
        res.status(404).json({message: "La cancion no existe"});
    }
    res.json(cancion);
})
//Crear una nueva cancion
app.post("/canciones", async(req, res)=>{
    const { titulo, artista, tono } = req.body;
    const nuevaCancion = {
        id: nanoid(),
        titulo, 
        artista,
        tono
    };
    let canciones = await getCanciones();
    canciones.push(nuevaCancion);
    await writeFile("./canciones.json", JSON.stringify(canciones));
    res.status(201).json(nuevaCancion);
})
//Actualizar cancion
app.put("/canciones/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;
    let canciones = await getCanciones();
    const cancionIndex = canciones.findIndex((cancion) => cancion.id === id);
    
    if (cancionIndex === -1) {
        return res.status(404).json({ message: "La canción no existe" });
    }

    canciones[cancionIndex] = {
        ...canciones[cancionIndex],
        ...(titulo && { titulo }),
        ...(artista && { artista }),
        ...(tono && { tono })
    };

    await writeFile('./canciones.json', JSON.stringify(canciones, null, 2));
    res.json(canciones[cancionIndex]);
});
//Eliminar una cancion
app.delete("/canciones/:id", async(req, res)=>{
    const { id } = req.params
    //Obtener las canciones
    let canciones = await getCanciones()
    const cancion = canciones.find((cancion)=> cancion.id === id)
    if(!cancion){
        res.status(404).json({message: "Cancion no encontrada o no existe"})
    }
    canciones = canciones.filter((cancion)=>cancion.id !== id)
    await writeFile("./canciones.json", JSON.stringify(canciones))
    res.json(canciones)
})