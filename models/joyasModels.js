const pool = require("../bd/server.js");
const format = require('pg-format');

const obtenerJoyasDB = async(limits,page,order_by) =>{
    const [campo,direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s', campo, direccion, limits , offset);
    pool.query(formattedQuery);
    const {rows: inventario} = await pool.query(formattedQuery);
    return inventario; 
}

const obtenerHATEOAS = async(joyas) => {
    const results = joyas.map((joya)=>{
        return {
            name: joya.nombre,
            href:`/joyas/joya/${joya.id}`,

        }
    }).slice(0,4);
    const total = joyas.length;
    const HATEOAS = {
        total,results
    }
    return HATEOAS;
}
const obtenerJoyasFiltrosDB = async({precio_max,precio_min,categoria,metal})=>{
    let filtros = [];

    const agregarFiltro = (campo, comparador, valor) => {
        filtros.push(format('%s %s %L', campo, comparador, valor));
    }

    if(precio_max) agregarFiltro('precio', '<=', precio_max);
    if(precio_min) agregarFiltro('precio', '>=', precio_min);
    if(categoria) agregarFiltro('categoria', '=', categoria);
    if(metal) agregarFiltro('metal', '=', metal);

    let consulta = "SELECT * FROM inventario";
    if(filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(" AND ")}`;
    }
    
    const { rows: joyas } = await pool.query(consulta);
    return joyas;
}
module.exports = {
    obtenerJoyasDB,
    obtenerHATEOAS,
    obtenerJoyasFiltrosDB
}