const {Pool} = require('pg');

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'1243',
    database:'joyas',
    allowExitOnIdle:true
});

module.exports = pool;