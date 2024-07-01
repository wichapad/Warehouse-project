const {  Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'warehouse',
    password: 'passw0rd',
    port: 5433,
})

module.exports = pool;