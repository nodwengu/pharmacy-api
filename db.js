const pg = require("pg");
const { Pool } = pg;

let localPoolConfig = {
    user: "thando",
    password: "thando123",
    host: "localhost",
    port: "5432",
    database: "pharmacy_db"
}

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorised: false }
} : localPoolConfig;

const pool = new Pool(poolConfig);

module.exports = pool;