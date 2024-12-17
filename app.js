const {obtenerJoyas,obtenerJoyasFiltros} = require('./controllers/joyasController.js');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use((req,res,next) =>{
    console.log(`Ruta de consulta:${req.path}, con el metodo: ${req.method}`);
    next();
})

app.listen(3000,console.log('Servidor encendido en puerto 3000'));

app.get("/joyas", async(req,res)=>{
    await obtenerJoyas(req,res);
});
app.get("/joyas/filtros",async(req,res)=>{
    await obtenerJoyasFiltros(req,res);
});
