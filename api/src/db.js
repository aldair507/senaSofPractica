import {DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_DATABASE}from  '../config/config.js'

import {createPool} from 'mysql2/promise'

const pool = createPool({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE,
    port:DB_PORT
});

export default pool;