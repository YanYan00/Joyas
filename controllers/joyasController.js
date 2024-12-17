const { obtenerJoyasDB, obtenerHATEOAS, obtenerJoyasFiltrosDB} = require('../models/joyasModels.js');

const obtenerJoyas= async(req,res)=>{
    try {
        const {limits,page,order_by} = req.query;
        const joyas = await obtenerJoyasDB(limits,page,order_by);
        const HATEOAS = await obtenerHATEOAS(joyas);
        res.json(HATEOAS);
    } catch (error) {
        res.status(500).send(error);
    }
}
const obtenerJoyasFiltros = async(req,res)=>{
    try {
        const queryStrings = req.query;
        const joyas = await obtenerJoyasFiltrosDB(queryStrings);
        res.json(joyas);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    obtenerJoyas,
    obtenerJoyasFiltros
}